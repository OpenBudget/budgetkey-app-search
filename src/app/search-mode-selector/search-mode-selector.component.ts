import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { SearchState } from '../search-state/search-state';
import { THEME_TOKEN, SearchBarType } from 'budgetkey-ng2-components';
import { SearchService } from '../api.service';

@Component({
    selector: 'search-mode-selector',
    templateUrl: './search-mode-selector.component.html',
    styleUrls: ['./search-mode-selector.component.less']
})
export class SearchModeSelectorComponent implements OnInit {

    @Input() state: SearchState;
    @Output() searching = new EventEmitter<boolean>();

    private multiSearching: object = {};

    constructor(
        private api: SearchService,
        @Inject(THEME_TOKEN) public theme: any,
    ) { }

    ngOnInit() {
    }

    onSearching(searching) {
        this.searching.emit(searching);
    }

    onSingleSearching(docTypeId, searching) {
        this.multiSearching[docTypeId] = searching;
        const anySearching = Object.values(this.multiSearching).filter(x => x).length > 0;
        this.searching.emit(anySearching);
    }

    cmp(a, b, prop, dflt) {
        return a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? dflt : 1;
    }

    sortedDocTypes() {
        const config: SearchBarType[] = this.theme.searchBarConfig.slice();
        const sorted = config.sort((a, b) => this.cmp(a, b, 'score', this.cmp(a, b, 'amount', 0)));
        return sorted;
    }

}
