import { SearchService } from '../api.service';
import { Subject, of, BehaviorSubject, Observable, from, merge } from 'rxjs';
import { SearchParams, SearchResults, DocResultEntry } from '../model';
import { debounceTime, switchMap, mergeMap, filter, map, last } from 'rxjs/operators';
import { SearchBarType } from 'budgetkey-ng2-components';
import { SearchState } from '../search-state/search-state';


export class SearchOutcome {
    constructor(
        public docs: DocResultEntry[],
        public isSearching: boolean,
        public isErrorInLastSearch: boolean
    ) {}
}


export class SearchManager {

    // Fetch more
    private moreQueue = new Subject<SearchParams>();
    private done = false;
    public last: SearchParams;

    // Results
    allResults: DocResultEntry[] = [];
    searchResults = new BehaviorSubject<SearchOutcome>(new SearchOutcome([], false, false));

    constructor(private api: SearchService,
                private state: SearchState,
                private docTypes: SearchBarType[],
                private debounce: number,
                modifyParams?: (sp: SearchParams) => SearchParams
        ) {

        if (!modifyParams) {
            modifyParams = (sp) => sp;
        }
        merge(this.moreQueue, state.searchQueue) // open a stream
            .pipe(
                filter((sp) => !!sp),
                map((sp) => {
                    sp = modifyParams(sp);
                    this.last = sp;
                    return sp;
                }),
                debounceTime(this.debounce),           // wait for 300ms pause in events
                switchMap((sp: SearchParams) => {
                    return this.doRequest(sp);
                }),
                mergeMap((x) => x)
            )
            .subscribe(
                (results: SearchResults) => {
                    this.processResults(results);
                },
                (error) => {
                    this.updateResults([], false, true);
                    console.log('Error while searching:', error);
                    return of<SearchResults>(null);
                }
            );
    }

    getMore() {
        if (!this.done) {
            this.last.offset = this.allResults.length;
            this.moreQueue.next(this.last);
        }
    }

    updateResults(results, isSearching, isErrorInLastSearch?) {
        this.allResults = results;
        const outcome = new SearchOutcome(
            results, isSearching, !!isErrorInLastSearch
        );
        this.searchResults.next(outcome);
    }

    doRequest(sp: SearchParams): Observable<any> {
        // Do actual request
        if (sp.offset === 0) {
            this.updateResults([], true);
        }
        const search = this.api.search(sp);
        const calls = [search];
        const toCount = this.docTypes.filter((dt: any) => dt !== sp.docType);
        if (toCount.length > 0) {
            const count = this.api.count(sp, toCount);
            calls.push(count);
        }
        // if (!this.theme.themeId) {
        // let timeline = this.searchService.timeline(sp);
        // calls.push(timeline);
        // }
        return from(calls);
    }

    processResults(results: SearchResults) {
        if (results) {
            if (results.search_counts) {
                for (let key of Object.keys(results.search_counts)) {
                    const count = results.search_counts[key].total_overall;
                    if (key === '_current') {
                        key = results.params.docType.id;
                        this.done = (results.params.offset + results.search_results.length) >= count;
                    }
                    for (const dt of this.docTypes) {
                        if (dt.id === key) {
                            dt.amount = count;
                            break;
                        }
                    }
                }
            }
            if (results.search_results) {
                this.allResults = this.allResults.slice(0, results.params.offset);
                this.allResults.push(...results.search_results);
                this.updateResults(this.allResults, results.params !== this.last);
            }
            // if (results.timeline) {
            //   this.timeline = results.timeline;
            // }
        }
    }

}
