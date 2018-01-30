import { Component, OnInit } from '@angular/core';
const timeline_menu = require('./timeline-menu.json');

@Component({
  selector: 'app-timeline-menu',
  template: require('./timeline-menu.component.html'),
  styles: [require('./timeline-menu.component.css')]
})
export class TimelineMenuComponent implements OnInit {

  private items: any[] = timeline_menu;

  constructor() { }

  ngOnInit() {
  }

}
