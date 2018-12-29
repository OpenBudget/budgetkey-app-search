import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'search-tag',
  templateUrl: './search-tag.component.html',
  styleUrls: ['./search-tag.component.less']
})
export class SearchTagComponent implements OnInit {

  @Input() name: string;
  @Input() amount: number;

  constructor() { }

  ngOnInit() {
  }

}
