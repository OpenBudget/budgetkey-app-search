/**
 * Created by adam on 18/12/2016.
 */
import { Component, OnInit}  from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { SearchService }     from './search.service'
import { SearchResults, DocResultEntry}     from './SearchResults'

@Component({
    moduleId: module.id,
    selector: 'budget-search',
    template: require('./search.component.html!text'),
    styles: [ require('./search.component.css!text') ],
    providers: [SearchService]
})
export class SearchComponent implements OnInit {
  
  private resultRenew : boolean ;
  private resultTotal : number;
  private resultTotalCount: {
                        entities: number,
                        exemption: number,
                        budget: number,
                        supports: number,
                        changes: number,
                        contractspending: number}
  private resultCurrentCount: {
                        entities: number,
                        exemption: number,
                        budget: number,
                        supports: number,
                        changes: number,
                        contractspending: number}
  private displayDocs: string;
  private currentDocs: string;
  private pageSize: number;
  private fetchFlag : boolean ;
  private term : string;
  private searchResults: Observable<SearchResults>;
  private budgetDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private changesDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private exemptionDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private procurementDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private contractspendingDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private supportsDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private entitiesDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.resultTotal = 0;
    this.resultTotalCount = {    
                       entities: 0,
                       exemption: 0, 
                       budget: 0,
                       supports : 0,
                       changes: 0,
                       contractspending:0};
    this.resultCurrentCount = {  
                       entities: 0,
                       exemption: 0, 
                       budget: 0,
                       supports : 0,
                       changes: 0,
                       contractspending:0};
    this.displayDocs = 'all';
    this.currentDocs = 'all';
    this.pageSize = 10;
    this.fetchFlag = true;
    this.resultRenew = false;
  }

  
  // Push a search term into the observable stream.
  search(term: string): void {
    if (this.term != term){
      this.resultTotal = 0;
      this.pageSize = 10;
      this.resultRenew = true;
      this.term = term;
      this.searchTerms.next(term);
    }
    else{
      this.resultRenew = false;
      this.term = term;
      this.searchTerms.next(term);
    }
  }

  fetchMore(term: number): void{
    console.log(term);
    var div = document.body.getElementsByClassName('search_body')[0];
    var cur = div.scrollTop;
    var divHeight = div.scrollHeight;
    if (cur > 0.2*divHeight && this.fetchFlag){
      this.fetchFlag = false;
      // this.pageSize += 10; 
      this.searchTerms.next(this.term);
      console.log(this.pageSize);
    }
  }

  doRequest() {
    this.currentDocs = this.displayDocs;
    var max = 0;
    if (this.resultRenew){
      max = 11;
    }
    else if (this.displayDocs == 'all'){
      var result_arr = this.resultTotalCount;
      var count_arr = Object.keys(result_arr).map(function ( key ) { return result_arr[key]; });
      max  = Math.max(...count_arr,21)
    }
    else {
      max = this.resultTotalCount[this.currentDocs]; 
    }

    if (this.pageSize+10 < max){
        this.pageSize += 10;
    }
    else if(this.pageSize != max && max != 0){
        this.pageSize = max;
    }
    else{
        return Observable.of<SearchResults>(null);
    }

    if (this.term) {
      return this.searchService.search(this.term, this.pageSize, [this.currentDocs]);
    } else {
      return Observable.of<SearchResults>(null);
    }
  }
  processResults(results: SearchResults){
       console.log('results: ', results);
        if (results){
          
            for (let key in results){
              if (key && key != 'error'){
                var tmpResults = results[key];
                var tmpKey = key.replace('-','')
                var tmpDocs = tmpKey+'Docs';
                if (this.resultRenew){
                  this.resultTotal += Number(tmpResults.total_overall);
                  this.resultTotalCount[tmpKey] = Number(tmpResults.total_overall);
                  this.resultCurrentCount[tmpKey] = this.pageSize;
                }
                else{
                  this.resultCurrentCount[tmpKey] = tmpResults.docs.length;
                }
                this[tmpDocs].next(tmpResults.docs)
              }
            }
          }
        this.fetchFlag = true;
        this.resultRenew = false;

  }

  ngOnInit() {
    this.searchResults = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      // .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(() => this.doRequest())
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<SearchResults>(null);
      });
    this.searchResults.subscribe((results) => {
      this.processResults(results);});
    this.search('חינוך');
  }

}
