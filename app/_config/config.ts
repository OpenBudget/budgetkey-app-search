import { OpaqueToken } from '@angular/core';

export const REMOTE_URL = 'https://next.obudget.org/search';
export const LOCAL_URL  = 'http://localhost:5000/search';
export const URL = REMOTE_URL;
// export const URL = LOCAL_URL;
export const THEME_ID_TOKEN = new OpaqueToken('Theme Id Token');
