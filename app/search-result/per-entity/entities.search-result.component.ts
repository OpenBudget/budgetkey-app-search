/**
 * Created by adam on 18/12/2016.
 */
import { Component } from '@angular/core';
import { BaseSearchResultComponent } from './base.search-result.component';

import * as _ from 'lodash';

// generic Component
@Component({
  selector: 'search-result-entities',
  template: `
    <div class='part' [ngClass]='"entity-kind-" + d["kind"]' (cldick)='navigate()'>
      <span class='top-right'>
        <span class='title'>
          <span class='tag' [innerHtml]='d["kind_he"]'></span>
          <span class='name' [innerHtml]='d["name"]'></span>
        </span>
        <span class='entity-id'>
          <span>מספר תאגיד</span>
          <span>{{ d["id"] }}</span>
        </span>
      </span>
      <span class='top-left' *ngIf='amount()'>
        <span class='description' [innerHtml]='amount_description()'></span>
        <span class='actual' [innerHtml]='format_number(amount()) + "&nbsp;₪"'></span>
      </span>
    </div>

    <div class='part' *ngIf='d.kind=="association"'>
      <span class='line'>
        <strong>מטרות: </strong><span [innerHtml]='d["details"]["objective"]'></span>
      </span>
      <span class='line'>
        <strong>אזורי פעילות: </strong><span [innerHtml]='d["details"]["activity_region_list"].join(", ")'></span>
      </span>
    </div>

    <div class='part' *ngIf='d.kind=="company"'>
      <span class='line'>
        <strong>מטרות: </strong><span [innerHtml]='d["details"]["description"] || d["details"]["goal"]'></span>
      </span>
      <span class='line'>
        <strong>כתובת: </strong><span [innerHtml]='d["details"]["address_lines"].join(", ")'></span>
      </span>
    </div>

    <div class='part' *ngIf='d.kind=="municipality"'>
      <span class='line'>
        <strong>מחוז: </strong><span [innerHtml]='d.details.district_2015'></span>
      </span>
      <span class='line'>
        <strong>{{d.details.status_municipal_2015}}: </strong>
        <span>
          {{d.details.total_population_end_2015_1000s}},000 תושבים |
          אשכול סוציו-אקונומי: {{d.details.index_socioeconomic_2013_cluster_from_1_to_10_1_lowest_most}}/10 |
          תקציב ב-2015: 
          <span [innerHtml]='format_number(d.details.expenses_of_municipality_for_activities_1000s_nis_2015*1000) + "&nbsp;₪"'></span>
        </span>
      </span>
    </div>


  `
})
export class EntitiesSearchResultComponent extends BaseSearchResultComponent {

  amount() {
    if (this.theme_id === 'socialmap' && this.d['details']['yearly_turnover']) {
      return this.d['details']['yearly_turnover'];
    }
    return this.d['received_amount'];
  }


  amount_description() {
    if (this.theme_id === 'socialmap' && this.d['details']['yearly_turnover']) {
      if (this.d['details']['last_report_year']) {
        return 'מחזור כספי שנתי<br/>לשנת ' + this.d['details']['last_report_year'];
      } else {
        return 'מחזור כספי שנתי<br/>לשנת הדיווח האחרונה';
      }
    }
    return 'כספי מדינה שקיבל ב-3<br/>השנים האחרונות';
  }

}
