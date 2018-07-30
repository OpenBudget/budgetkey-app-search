import 'core-js/client/shim.min.js';
import 'reflect-metadata';
import 'zone.js';

import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

const langIndex = window.location.href.indexOf('lang=');
let language = '';
if (langIndex !== -1) {
  language = window.location.href.substring(langIndex+5, langIndex+7);
} else {
  language = 'he';
}
const translations = require(`./locale/messages.${language}.xlf`);
const dynamdict =
{
  // Put in JSON if list gets too big
  // getStatusText
'1': 'string1', // טוען...
'2': 'string2', // אירעה שגיאה בחיפוש, נסו שוב
'3': 'string3', // אין תוצאות
'4': 'string4' // שורת החיפוש ריקה. בצעו חיפוש כלשהו
};

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
  ]
});
