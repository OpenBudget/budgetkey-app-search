'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const nunjucks = require('nunjucks');
const request = require("request");
const urlencode = require('urlencode');

const basePath = process.env.BASE_PATH || '/';
const rootPath = path.resolve(__dirname, './dist');
const disableCache = process.env.DISABLE_CACHE || false;

const app = express();
if (disableCache) {
  app.disable('view cache');
}

nunjucks.configure(rootPath, {
  autoescape: true,
  noCache: disableCache,
  express: app
});

app.set('port', process.env.PORT || 8000);

app.get(basePath + '*', function(req, res) {
  var filePath = path.resolve(rootPath, req.params[0]);
  if (fs.existsSync(filePath)) {
    var stats = fs.lstatSync(filePath);
    if (stats.isFile()) {
      return res.sendFile(filePath);
    }
  }

  var theme = typeof(req.query.theme) !== "undefined" ? req.query.theme : '';
  var themeFileName = theme !== '' ? 'theme.'+req.query.theme+'.json' : null;
  var themeScript = '';
  var themeJson = null;
  if (themeFileName) {
    // try the themes root directory first - this allows mount multiple themes in a single shared docker volume
    if (fs.existsSync(path.resolve('/themes', themeFileName))) {
      themeJson = JSON.parse(fs.readFileSync(path.resolve('/themes', themeFileName)));
      // fallback to local file - for local development / testing
    } else if (fs.existsSync(path.resolve(__dirname, themeFileName))) {
      themeJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, themeFileName)));
    }
    if (themeJson) {
      for (var key in themeJson) {
        themeScript += key+"="+JSON.stringify(themeJson[key])+";";
      }
      themeScript += "BUDGETKEY_THEME_ID=" + JSON.stringify(req.query.theme) + ";";
    }
  }

  //set language
  var lang = typeof(req.query.lang) !== "undefined" ? req.query.lang : '';
  var langScript = '';
  if (lang) {
    langScript += "BUDGETKEY_LANG=" + JSON.stringify(lang) + ";";
  }

  var siteName = (themeJson && themeJson.BUDGETKEY_APP_GENERIC_ITEM_THEME) ? themeJson.BUDGETKEY_APP_GENERIC_ITEM_THEME.siteName : 'מפתח התקציב';
  var title = siteName + ' - חיפוש';
  var term = req.query.q;
  var kind = req.query.dd;
  if (term) {
    if (!kind) {
      kind = 'all';
    }
    if (kind == 'all') {
      kind = 'כל מה שקשור ל';
    } else if (kind == 'entities') {
      kind = 'ארגונים הקשורים ל';
    } else if (kind == 'associations') {
      kind = 'עמותות וחל״צ הקשורות ל';
    } else if (kind == 'procurement') {
      kind = 'התקשרויות ומכרזים הקשורים ל';
    } else if (kind == 'tenders') {
      kind = 'מכרזים הקשורים ל';
    } else if (kind == 'central-tenders') {
      kind = 'מכרזים מרכזיים הקשורים ל';
    } else if (kind == 'office-tenders') {
      kind = 'מכרזים משרדיים הקשורים ל';
    } else if (kind == 'exemptions') {
      kind = 'פטורים ממכרז הקשורים ל';
    } else if (kind == 'contracts') {
      kind = 'התקשרויות רכש הקשורות ל';
    } else if (kind == 'supports') {
      kind = 'תמיכות הקשורות ל';
    } else if (kind == 'budget') {
      kind = 'סעיפי תקציב הקשורים ל';
    } else if (kind == 'national-budget-changes') {
      kind = 'העברות תקציביות הקשורות ל';
    } else if (kind == 'field-of-activity-reports') {
      kind = 'תחומי פעילות הקשורים ל';
    } else if (kind == 'district-reports') {
      kind = 'מחוזות הקשורים ל';
    }
    title += ' ' + kind + term
  }

  res.render('index.html', {
    langScript: langScript,
    themeScript: themeScript, base: basePath, title: title,
    authServerUrl: process.env.AUTH_SERVER_URL
  });
});

app.listen(app.get('port'), function() {
  console.log('Listening port ' + app.get('port'));
});
