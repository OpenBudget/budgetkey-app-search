/**
 * Created by adam on 18/12/2016.
 */
export const REMOTE_URL = 'https://next.obudget.org/search';
export const LOCAL_URL  = 'http://localhost:5000/search';
export const URL = REMOTE_URL;
// export const URL = LOCAL_URL;
export const GENERIC_ITEM_PAGE_URL = 'http://next.obudget.org/i/';

// TODO: We should aim for the theme selection to be applied in one of two ways:
// Environment variable (i.e. same docker image, theme is selected at run time according to the value of an env var)
// Docker image inheritance (i.e. you create a new Docker image in which you only overwrite a single theme.json file
// which contains the theme specification.
export const THEME = 'OpenProcurement';
