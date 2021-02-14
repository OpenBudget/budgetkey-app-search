import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bare-search-bar',
  templateUrl: './bare-search-bar.component.html',
  styleUrls: ['./bare-search-bar.component.less']
})
export class BareSearchBarComponent implements OnInit {

  @Input() config: any = {};
  @Output() search = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
