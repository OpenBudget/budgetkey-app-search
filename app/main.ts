import 'core-js/client/shim.min.js';
import 'reflect-metadata';
import 'zone.js';

import { TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule, LANG } from './app.module';

const translations = {
  'he': require(`./i18n/messages.he.xlf`),
  'en': require(`./i18n/messages.en.xlf`),
}[LANG];

let providers: any[] = [];
if (typeof(translations) !== 'undefined') {
  providers = [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
  ];
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: providers
});
