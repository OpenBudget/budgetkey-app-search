import 'core-js/client/shim.min.js';
import 'reflect-metadata';
import 'zone.js';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';


platformBrowserDynamic().bootstrapModule(AppModule);

declare const require;
var BUDGETKEY_LANG='he';
const translations = require(`./locale/messages.${BUDGETKEY_LANG}.xlf`);
const dynamicTranslations = {
  //getStatusText
  'id1': 'string1', //טוען...
  'id2': 'string2', //אירעה שגיאה בחיפוש, נסו שוב
  'id3': 'string3', //אין תוצאות
  'id4': 'string4', //שורת החיפוש ריקה. בצעו חיפוש כלשהו
  //...
};

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
  ]
})
