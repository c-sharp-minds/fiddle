# Fiddle

This is a simple project, used as a local and raw [jsFiddle](https://jsfiddle.net/).

## Usage

```shell
# To get things going the first time:
$ yarn

# To really get things going:
# This starts a webpack-dev-server with index.js that allows you to do simple JavaScript, HTML and CSS stuff with livereload.
$ yarn start

# If you just want to test some javascript stuff in the console/terminal with server.js:
# Do note that nodemon will stumble when importing css and using `document` etc. 
# This is why we use a separate js file, so we can keep this logic separated.
$ yarn watch
```

## Files

### index.js

* Run: `yarn start`
* Config: *webpack.config.js*

This file is used for running a web client.

### server.js

* Run: `yarn watch`
* Config: *webpack.server.config.js*

This file is used for running with target node. The main reason for this is to open up the possibility to fiddle with stuff like [`fs`](https://nodejs.org/api/fs.html), which is not accessible in the browser.
