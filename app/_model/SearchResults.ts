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
}

class KindResults {
  data_time_distribution: Array<TimeDistributionEntry>;
  docs: Array<DocResultEntry>;
  total_in_result: number;
  total_overall: number;
}

export class SearchResults {
  entities: KindResults;
  exemption: KindResults;
  budget: KindResults;
  supports: KindResults;
  changes: KindResults;
  procurement: KindResults;
}

export class SearchResultsCounter{
  entities:  number;
  exemption: number;
  budget:    number;
  supports:  number;
  changes:   number;
  contractspending: number;
}
