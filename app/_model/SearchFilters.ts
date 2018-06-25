export class FilterOption {
  name: string;
  value: string;
  selected: boolean = false;
}

export class SearchFilter {
  name: string;
  value: string;
  options: FilterOption[];
}
