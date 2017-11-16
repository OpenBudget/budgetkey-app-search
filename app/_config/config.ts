/**
 * Created by adam on 18/12/2016.
 */
export const REMOTE_URL = 'https://next.obudget.org/search';
export const LOCAL_URL  = 'http://localhost:5000/search';
export const URL = REMOTE_URL;
// export const URL = LOCAL_URL;

export let Colors = {
  bgColor: '#ccc'
};

declare const process: any;

export let GENERIC_ITEM_BASE_URL: any;
if (process.env.BUDGETKEY_GENERIC_ITEM_BASE_URL) {
  GENERIC_ITEM_BASE_URL = process.env.BUDGETKEY_GENERIC_ITEM_BASE_URL;
} else {
  GENERIC_ITEM_BASE_URL = 'https://next.obudget.org/i/';
}
