'use strict';
const request = require("request");
const urlencode = require('urlencode');
const fs = require('fs');
const path = require('path');

const themeFileName = 'theme.budgetkey.he.json';
let themeJson = {};
if (fs.existsSync(path.resolve('/themes', themeFileName))) {
    themeJson = JSON.parse(fs.readFileSync(path.resolve('/themes', themeFileName)));
} else if (fs.existsSync(path.resolve(__dirname, themeFileName))) {
    themeJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, themeFileName)));
}
themeJson = themeJson.BUDGETKEY_NG2_COMPONENTS_THEME.searchBarConfig;
const URLS = [];
for (let docType of themeJson) {
    const types = docType.types.join(',');
    URLS.push(`https://next.obudget.org/search/${types}?size=1&offset=0`)
    const filters = docType.filters ? JSON.stringify(docType.filters).slice(1, -1) : '';
    URLS.push(`https://next.obudget.org/search/${types}?size=10&offset=0&filter=${urlencode(filters)}`)
    const docTypes = [];
    if (docType.filterMenu && docType.filterMenu.length > 0) {
        for (let option of docType.filterMenu[0].options) {
            const newDocType = Object.assign({}, docType, option);
            docTypes.push(newDocType);
        }
        const config = docTypes.map((t) => {
            return {
              id: t.id,
              doc_types: t.types,
              filters: t.filters || {}
            };
        });
        const config_param = JSON.stringify(config);
        console.log(config_param);
        URLS.push(`https://next.obudget.org/search/count?config=${urlencode(config_param)}`)
    }
}

const CACHE = {};

function fetchCache() {
    console.log('Fetching cache...');
    for (let url of URLS) {
        request({url: url, json: true }, function (error, response, body) {
            console.log(response.request.uri.href);
            if (response.statusCode === 200 && body !== null) {
                CACHE[response.request.uri.href] = body;
            } else {
                console.log('BAD URL!!!', response.request.uri.href);
            }
        });
    }
    console.log('done!');
}

setInterval(fetchCache, 3600 * 1000);
fetchCache();

module.exports = CACHE;
