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
  exemptions: KindResults;
  budget: KindResults;
  supports: KindResults;
  nationalbudgetchanges: KindResults;
  procurement: KindResults;
}

export class SearchResultsCounter{
  entities:  number;
  exemptions: number;
  budget:    number;
  supports:  number;
  nationalbudgetchanges : number;
  contractspending: number;
}
