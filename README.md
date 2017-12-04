# BudgetKey Search App

This is the search interface budgetkey app.

It currently can be accessed at http://next.obudget.org/app/search/

## Quick Start (Set up a dev server)
1. Clone && cd into directory
2. `npm install`
3. `npm run dist-serve`

* For Windows users - 1) run on one terminal `npm run dist-serve`
                      2) run on a  second terminal `npm start`

You should make sure you use the latest node v8.

If you have [nvm](https://github.com/creationix/nvm/blob/master/README.md#installation) installed, 
you can just run `nvm install` and you will have the correct version.

## Basic functionality: ##

- It allows users to type in a free text query and get results from the Budget Key database.
- Results are received from the Search API.
- Results can be filtered by kind and time range.
- Results link to other parts of the web site.

Design mockups can be seen in issue [#1](https://github.com/OpenBudget/budgetkey-app-search/issues/1).

Before starting, take a peek in our [documentation](https://github.com/OpenBudget/BudgetKey/blob/master/README.md)

## Generating Components, Directives, Pipes and Services

You can use the `ng generate` (or just `ng g`) command to generate Angular components:

```bash
ng generate component my-new-component
ng g component my-new-component # using the alias

# components support relative path generation
# if in the directory app/feature/ and you run
ng g component new-cmp
# your component will be generated in app/feature/new-cmp
# but if you were to run
ng g component ../newer-cmp
# your component will be generated in app/newer-cmp
# if in the directory app you can also run
ng g component feature/new-cmp
# and your component will be generated in app/feature/new-cmp
```
You can find all possible blueprints in the table below:

Scaffold  | Usage
---       | ---
[Component](https://github.com/angular/angular-cli/wiki/generate-component) | `ng g component my-new-component`
[Directive](https://github.com/angular/angular-cli/wiki/generate-directive) | `ng g directive my-new-directive`
[Pipe](https://github.com/angular/angular-cli/wiki/generate-pipe)           | `ng g pipe my-new-pipe`
[Service](https://github.com/angular/angular-cli/wiki/generate-service)     | `ng g service my-new-service`
[Class](https://github.com/angular/angular-cli/wiki/generate-class)         | `ng g class my-new-class`
[Guard](https://github.com/angular/angular-cli/wiki/generate-guard)         | `ng g guard my-new-guard`
[Interface](https://github.com/angular/angular-cli/wiki/generate-interface) | `ng g interface my-new-interface`
[Enum](https://github.com/angular/angular-cli/wiki/generate-enum)           | `ng g enum my-new-enum`
[Module](https://github.com/angular/angular-cli/wiki/generate-module)       | `ng g module my-module`

angular-cli will add reference to `components`, `directives` and `pipes` automatically in the `app.module.ts`. If you need to add this references to another custom module, follow this steps:
 
 1. `ng g module new-module` to create a new module
 2.  call `ng g component new-module/new-component`
 
This should add the new `component`, `directive` or `pipe` reference to the `new-module` you've created.

### Note

To run the tests import karma-test-shim in the newly created *.spec.ts:

	import 'karma-test-shim';


## Themes

The core components and apps support themes for reusability of common code.

To run the app with a different theme, you need to set the theme in `theme.THEME_NAME.json`

For example, theme.govbuy.json:

```
{
  "BUDGETKEY_NG2_COMPONENTS_THEME": {
    "siteName": "רכש פתוח"
  }
}
```

To enable a theme, add the `theme` query parameter with a value matching a `theme.THEME_NAME.json` file available at the root of the project.

Theme files could be overwritten by docker volume to allow to use the same image to serve the app using different themes.

For example, given a modified theme in ./my-theme.json:

```
docker build -t budgetkey-app-search .
docker run -it -v `pwd`/my-theme.json:/app/theme.my-theme.json --rm --name budgetkey-app-search -p8000:8000 budgetkey-app-search
```

You could then add `?theme=my-theme` to enable the theme
