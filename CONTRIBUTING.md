# Contributing to Fiddle

## Git flow

For branching strategy, [git flow]([https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow](https://danielkummer.github.io/git-flow-cheatsheet/)) is applied. This means we mainly work on `feature` branches, that are merged into `develop` branch when finished and subsequently merged into `master`.
Git flow is a useful rule of thumb that keeps any project organized with hardly any effort. In SourceTree there is a dedicated button for it or it can be easily initialized with `git flow init` in your (git) shell or cmd (if enabled on windows). This sets the branch names locally. The suggested branch names are used for convenience.
For example when working on the feature **Foo**:

1. Start feature: `git flow feature start foo`
2. Commit to `feature/foo`
3. Finish `feature/foo`: `git flow feature finish foo` - this merges the branch into `develop`

## Pull request

To merge from `develop` into `master` - or in other words, to create a *release* - a pull request (PR) is required. This pull request needs to be reviewed and approved by another Code Owner before it can be closed.

## Commit

Git commit [prefixes](https://karma-runner.github.io/3.0/dev/git-commit-msg.html) are useful for automatic generating of the changelog (when implemented) and simple navigation through git history (e.g. ignoring style changes).

#### Prefixes

* **feat** (new feature for the user, not a new feature for build script)
* **fix** (bug fix for the user, not a fix to a build script)
* **docs** (changes to the documentation)
* **style** (formatting, missing semi colons, etc; no production code change)
* **refactor** (refactoring production code, eg. renaming a variable)
* **test** (adding missing tests, refactoring tests; no production code change)
* **chore** (updating grunt tasks etc; no production code change)

## Style Guide

There is a project settings file for VS Code. This can be used for example, to enforce automatic fixing of lint issues on save.
If you like other IDE's, feel free to create a project settings file for said environment.
If there are rules that are annoying or better configurations, don't hesitate to share them.

These are some features that have useful plugins available.

* [**ESlint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (uses Google's linting, [eslint-config-google](https://github.com/google/eslint-config-google) with some adaptations on personal preferences)
* [**Editorconfig**](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)