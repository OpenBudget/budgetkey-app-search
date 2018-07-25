import { NgModule }              from '@angular/core';
import { RouterModule }  from '@angular/router';

import { SearchComponent } from './search/search.component';

const appRoutes = [
  { path: '', component: SearchComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, {
        useHash: false
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
