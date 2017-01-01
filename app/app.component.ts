import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    budgetkey-container > .app {
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
