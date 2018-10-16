import 'core-js/client/shim.min.js';
import 'reflect-metadata';
import 'zone.js';

import { TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import BUDGETKEY_LANG, { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);

const translations = require(`./i18n/messages.${BUDGETKEY_LANG}.xlf`);

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
  ]
});
