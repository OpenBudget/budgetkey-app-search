import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { SearchComponent } from './search/search.component';

const appRoutes = [
  { path: 'search', component: SearchComponent },
  { path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, { 
        enableTracing: true, // debugging porpuse
        useHash: true
      }     
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
