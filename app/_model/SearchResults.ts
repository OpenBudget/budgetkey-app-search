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
  nationalbudgetchanges: KindResults;
  procurement: KindResults;
  people: KindResults;
}

export class SearchResults {
  search_counts: SearchResultsCounts;
  search_results: Array<DocResultEntry>;
}

export class SearchResultsCounter {
  entities:  number = 0;
  budget:    number = 0;
  supports:  number = 0;
  nationalbudgetchanges: number = 0;
  procurement: number = 0;
  people: number = 0;
}
