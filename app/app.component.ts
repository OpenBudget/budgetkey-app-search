import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <budgetkey-container>
        <h1>Hello {{name}}</h1>
        <budget-search></budget-search>      
      </budgetkey-container>
  `,
})
export class AppComponent  { name = 'Angular'; }
