import { SearchBarType } from 'budgetkey-ng2-components';

export class SearchParams {
    // defaultTerm: boolean;
    // timeRange: string;
    // timeRangeDisplay: string;
    // startRange: string;
    // endRange: string;
    // displayDocs: string;
    // displayDocsDisplay: string;
    // displayDocsTypes: string[];

    constructor(other?: SearchParams) {
        if (other) {
            this.term = other.term;
            this.period = other.period;
            this.docType = other.docType;
            this.offset = other.offset;
            this.pageSize = other.pageSize;
            this.filters = other.filters;
            this.ordering = other.ordering;
        }
    }

    term: string;
    period: any;
    docType: SearchBarType;
    offset: number;
    pageSize: number;
    filters: any;
    ordering: string;
}

class TimeDistributionEntry {
    doc_count: number;
    key: number;
    key_as_string: string;
}

export class DocResultEntry {
    highlight: any;
    source: any;
    type: any;
    score: number;
}

class KindResults {
    data_time_distribution: Array<TimeDistributionEntry>;
    total_in_result: number;
    total_overall: number;
}

class SearchResultsCounts {
    entities: KindResults;
    budget: KindResults;
    supports: KindResults;
    'national-budget-changes': KindResults;
    procurement: KindResults;
    people: KindResults;
    gov_decisions: KindResults;
}

export class SearchResults {
    search_counts: SearchResultsCounts;
    search_results: Array<DocResultEntry>;
    timeline: Array<any>;
    params?: SearchParams;
}
