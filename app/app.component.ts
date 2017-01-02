import { Component, ViewEncapsulation } from '@angular/core';
import { Colors } from './config';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('styles.css!text') ],
  template: `
      <budgetkey-container>
        <div class="container-fluid">
            <budget-search></budget-search>
        </div>
      </budgetkey-container>
  `,
})
export class AppComponent  { }
