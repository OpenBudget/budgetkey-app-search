import { SearchService } from '../api.service';
import { Subject, of, BehaviorSubject, Observable, from } from 'rxjs';
import { SearchParams, SearchResults, DocResultEntry } from '../model';
import { debounceTime, switchMap, mergeMap } from 'rxjs/operators';
import { SearchBarType } from 'budgetkey-ng2-components';

export class SearchState {

    // Search request queue
    searchQueue = new BehaviorSubject<SearchParams>(null);

    // Search state
    _term: string;
    _docType: SearchBarType;
    _filters: any;
    _period: any;

    private enabled = false;

    constructor(private docTypes: SearchBarType[]) {
        this._docType = docTypes[0];
    }

    set term(term: string) {
        if (this._term !== term) {
            this._term = term;
            this.initiateSearch();
        }
    }

    get term() {
        return this._term;
    }

    set docType(docType: SearchBarType) {
        if (docType !== this._docType) {
            this._docType = docType;
            if (docType.filterMenu) {
                for (const filterMenu of docType.filterMenu) {
                    if (!filterMenu.selected) {
                        filterMenu.selected = filterMenu.options[0];
                    }
                }
            }
            this.initiateSearch();
        }
    }

    get docType() {
        return this._docType;
    }

    set filters(filters: any) {
        this._filters = filters;
        this.initiateSearch();
    }

    get filters() {
        return this._filters;
    }

    set period(period: any) {
        if (period !== this._period) {
            this._period = period;
            this.initiateSearch();
        }
    }

    get period() {
        return this._period;
    }

    initiateSearch() {
        if (!this.enabled) {
            return;
        }
        const sp = new SearchParams();
        sp.term = this._term;
        sp.period = this._period;
        sp.docType = this._docType;
        sp.offset = 0;
        sp.pageSize = 10;
        sp.filters = Object.assign({}, sp.docType.filters || {});
        if (sp.docType.filterMenu) {
            for (const filterMenu of sp.docType.filterMenu) {
              sp.filters = Object.assign({}, sp.filters, filterMenu.selected.filters || {});
            }
        }
        this.searchQueue.next(sp);
    }

    start() {
        if (this.enabled) {
            return;
        }
        this.enabled = true;
        this.initiateSearch();
    }

}
