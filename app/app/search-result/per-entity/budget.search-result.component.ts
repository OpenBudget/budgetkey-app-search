/**
 * Created by adam on 18/12/2016.
 */
import { Component } from '@angular/core';
import { BaseSearchResultComponent } from './base.search-result.component';

import * as _ from 'lodash';

// generic Component
@Component({
  selector: 'search-result-budget',
  template: `
    <div class='part' [ngClass]='"func-cls-" + func_cls()[0][0]'>
      <span>
        <span class='tag' *ngIf='d.code[0] !== "C"'>
              סעיף תקציבי /
        </span>
        <span class='tag' *ngIf='d.code[0] === "C"'>
              נושא תקציבי /
        </span>
        <span class='breadcrumbs' [innerHtml]="d['nice-breadcrumbs']"></span>      
      </span>
      <span class='top-left'>
        <span class='func-cls' [innerHtml]="d['nice-category']"></span>
        <span class='circle'></span>
      </span>      
    </div>
    <div class='part' [ngClass]='"func-cls-" + func_cls()[0][0]' (click)='navigate()'>
      <span>
        <span class='code' [innerHtml]='d["nice-code"]'></span>
        <span class='title' [innerHtml]='d["title"]'></span>
      </span>
      <span class='amount' [innerHtml]='format_number(d["net_revised"]) + "&nbsp;₪"'></span>
    </div>
    <div class='part'>
      <span class='description' *ngIf='d["children"]'>
      סעיף זה מורכב מן התקציבים של: 
        <span [innerHtml]='top_children()'>
        </span>
      </span>
    </div>
  `
})
export class BudgetSearchResultComponent extends BaseSearchResultComponent {

  func_cls() {
    try {
      return JSON.parse(this.d['func_cls_json'][0]);
    } catch (e) {
      console.log('WTF with ', this.d['func_cls_json']);
      return 'x';
    }
  }

  top_children() {
    if (!this.d['children']) {
      return null;
    }
    let ret = _.map(
      _.sortBy(this.d['children'],
               (c) => -c['net_revised']),
      (c) => c['title']
    ).slice(0, 3).join(', ');
    if (this.d['children'].length > 3) {
      ret += ' ועוד';
    }
    return ret;
  }
}
