import { BehaviorSubject } from 'rxjs';
import { SearchParams } from '../model';
import { SearchBarType } from 'budgetkey-ng2-components';

export function mergeFilters(...filters) {
    const arrays = [];
    for (let f of filters) {
        if (!f) {
            continue;
        }
        if (!Array.isArray(f)) {
            f = [f];
        }
        arrays.push(f);
    }
    while (arrays.length > 1) {
        const first = arrays.shift();
        const second = arrays.shift();
        const newone = [];
        for (const i of first) {
            for (const j of second) {
                let cont = false;
                for (const k of Object.keys(i)) {
                    if (Array.isArray(i[k]) && i[k].includes(j[k])) {
                        continue;
                    }
                    if (j[k] && j[k] !== i[k]) {
                        cont = true;
                        break;
                    }
                }
                if (cont) {
                    continue;
                }
                newone.push(Object.assign({}, i, j));
            }
        }
        arrays.unshift(newone);
    }
    return arrays[0];
}


export class SearchState {

    // Search request queue
    searchQueue = new BehaviorSubject<SearchParams>(null);

    // Search state
    _term: string;
    _docType: SearchBarType;
    _filters: any;
    _period: any;
    searchContext: string;

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

    setSearchContext(context: string) {
        this.searchContext = Array.isArray(context) ? context.join(' ') : null;
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
        sp.context = this.searchContext;
        const filters = [];
        filters.push(sp.docType.filters);
        if (sp.docType.filterMenu) {
            for (const filterMenu of sp.docType.filterMenu) {
                if (filterMenu.selected.filters) {
                    filters.push(filterMenu.selected.filters);
                }
            }
        }
        sp.filters = mergeFilters(...filters);
        if (!this._term) {
            sp.ordering = sp.docType.ordering;
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
