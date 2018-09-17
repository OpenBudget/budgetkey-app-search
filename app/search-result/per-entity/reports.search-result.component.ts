/**
 * Created by adam on 18/12/2016.
 */
import { Component } from '@angular/core';
import { BaseSearchResultComponent } from './base.search-result.component';

import * as _ from 'lodash';

// generic Component
@Component({
  selector: 'search-result-reports',
  template: require('./reports.search-result.component.html'),
})
export class ReportsSearchResultComponent extends BaseSearchResultComponent {

}
