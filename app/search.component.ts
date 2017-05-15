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
  
  private resultCount: {total: number,
                        entities: number,
                        exemption: number,
                        budget: number,
                        supports: number,
                        changes: number}
  private  displayDocs: string;
  private pageSize: number;
  private fetchFlag : boolean ;
  private term : string;
  private kinds : Array<string>;
  private searchResults: Observable<SearchResults>;
  private budgetDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private changesDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private exemptionDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private procurementDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private supportsDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private entitiesDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.resultCount = { total:0,   
                       entities: 0,
                       exemption: 0, 
                       budget: 0,
                       supports : 0,
                       changes: 0};
    this.displayDocs = 'all';
    this.pageSize = 10;
    this.fetchFlag = true;
    // this.kinds = ['changes','exemption', 'budget', 'procurement', 'entities', 'supports'];
    this.kinds = ['all'];
  }

  
  // Push a search term into the observable stream.
  search(term: string): void {
    this.term = term;
    this.searchTerms.next(term);
  }

  fetchMore(): void{
    var page = document.body;
    var view_height = page.scrollHeight;
    var cur = page.scrollTop;
    if (cur > 0.2*view_height && this.fetchFlag){
      this.fetchFlag = false;
      this.pageSize += 20; 
      this.searchTerms.next(this.term);
      console.log(view_height, cur);
    }
  }

  doRequest() {    
    if (this.displayDocs != 'all'){
      if (this.displayDocs != this.kinds[0] && this.pageSize > 40){
        this.pageSize = 10;
      }
      this.kinds = [this.displayDocs];
    }
    else{
      if (this.kinds.length == 1){
        this.pageSize = 10;
      }
      // this.kinds = ['changes','exemption', 'budget', 'procurement', 'entities', 'supports'];
      this.kinds = ['entities'];
    }
    if (this.term) {
      return this.searchService.search(this.term, this.pageSize, this.kinds);
    } else {
      return Observable.of<SearchResults>(null);
    }
  }
  processResults(results: SearchResults){
       console.log('results: ', results);
        this.fetchFlag = true;
        if (results){
          this.resultCount.total = 0;
            for (let key in results){
              if (key){
                var tmpResults = results[key];
                var tmpDocs = key+'Docs';
                this.resultCount.total += Number(tmpResults.total_overall);
                this.resultCount[key] = Number(tmpResults.total_overall);
                this[tmpDocs].next(tmpResults.docs)
              }
            }
            // console.log(this.resultCount);
          }
          
        if (results && results.budget) {
          this.budgetDocs.next(results.budget.docs);
        }
        if (results && results.changes) {
          this.changesDocs.next(results.changes.docs);
        }
        if (results && results.exemption) {
          this.exemptionDocs.next(results.exemption.docs);
        }
        if (results && results.procurement) {
          this.procurementDocs.next(results.procurement.docs);
        }
        if (results && results.supports) {
          this.supportsDocs.next(results.supports.docs);
        }
        if (results && results.entities) {
          this.entitiesDocs.next(results.entities.docs);
        }
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
