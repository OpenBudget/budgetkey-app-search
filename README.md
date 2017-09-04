# BudgetKey Search App

This is the search interface budgetkey app.

It currently can be accessed at http://next.obudget.org/app/search/

## Quick Start (Set up a dev server)
1. Clone && cd into directory
2. `npm install`
3. `npm run dist-serve`

* For Windows users - 1) run on one terminal `npm run dist-serve`
                      2) run on a second terminal `npm start`

You should make sure you use the correct node version, at time of writing it's v8.3.0.

If you have [nvm](https://github.com/creationix/nvm/blob/master/README.md#installation) installed, 
you can just run `nvm install` and you will have the correct version.

## Basic functionality: ##

- It allows users to type in a free text query and get results from the Budget Key database.
- Results are received from the Search API.
- Results can be filtered by kind and time range.
- Results link to other parts of the web site.

Design mockups can be seen in issue [#1](https://github.com/OpenBudget/budgetkey-app-search/issues/1).

Before starting, take a peek in our [documentation](https://github.com/OpenBudget/BudgetKey/blob/master/README.md)
