/**
 * Created by Tuser on 05/03/2018.
 */
export class FilterOption {
  name: string;
  value: string;
}

export class SearchFilter {
  name: string;
  field: string;
  options: FilterOption[];
}

