import { Component, ViewEncapsulation } from '@angular/core';
import { THEME } from './_config/config';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./styles.scss') ],
  template: require('./app.component.html'),
})
export class AppComponent {
  theme: string = THEME;
}
