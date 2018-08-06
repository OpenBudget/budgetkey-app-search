import { SearchParams } from './SearchParams';

/**
 * Created by adam on 18/12/2016.
 */

class TimeDistributionEntry {
  doc_count: number;
  key: number;
  key_as_string: string;
}

export class DocResultEntry {
  highlight: any;
  source: any;
  type: any;
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
}

export class SearchResults {
  search_counts: SearchResultsCounts;
  search_results: Array<DocResultEntry>;
  timeline: Array<any>;
  term: string;
  displayDocs: string;
  offset: number;
  pageSize: number;
  params?: SearchParams;
}
