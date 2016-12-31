import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  styles: [`
    budgetkey-container {
        background-color: #ccc;
        display: block;
    }
    
    .container-fluid {
        padding: 10px;
        max-width: 1024px;
    }
  `],
  template: `
      <budgetkey-container>
        <div class="container-fluid">
            <budget-search></budget-search>              
        </div>      
      </budgetkey-container>
  `,
})
export class AppComponent  { }
