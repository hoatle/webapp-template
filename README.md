# webapp-template [![Build Status](https://secure.travis-ci.org/hoatle/webapp-template.png?branch=master)](http://travis-ci.org/hoatle/webapp-template)

Web application structure template (layout), starting point for backbone + requirejs + twitter bootstrap application compiled by nodejs and running on any web server or phonegap environment :-)

## Live development deployment at:
* http://watpl-hoatle.dotcloud.com/
* http://watpl.herokuapp.com
* http://watpl.jit.su/ (dev mod)
* http://watpl.ap01.aws.af.cm/ (dev mode)
* http://watpl.nodester.com/ (dev mode)

## MVC
+ take advantage of convention over configuration.
+ any controller should be placed on 'controller' directory and extends 'controller/Controller', should be named with affix: 'Controller'.
+ any view should be placed on 'view' directory and extends 'view/BaseView', should be named with affix: 'View'.

### url mapping with MVC
+ By default, application uses hash value for router to dispatch to accordingly controller by pattern: /:controller/:action/*params.

## Run the application

+ Make sure to have latest node installed (with version as 0.6.x and above)
+ Make sure to have 'make'

+ You must run this command first to have node modules installed: ```make``` or ```make resolve```

+ Check style with jshint: ```make check-style```

+ Test the application: ```make test```

+ Run the application on development mode: ```make run-dev```

+ Run the application on development mode with remote debug: ```make run-dev-debug```. See notice
 on section: Remote debug the application with ```make run-dev-debug``` below.

+ Run this application on production mode: ```make run-prod```

+ Access application: http://localhost:8080

+ Access browser tests: http://localhost:8080/browser (only on development mode)

+ Package the production application: ```make package```

+ Clean the production application build: ```make clean```

## Remote debug the application with ```make run-dev-debug```

+ As the application uses 'node-supervisor' for hot-reloading, we need to have enable remote debug
for node-supervisor. Follows the steps here to have node-debug:
http://stackoverflow.com/questions/6468015/run-node-js-application-in-debug-with-supervisor

+ Then ```make run-dev-debug```

+ see more:
https://groups.google.com/forum/?fromgroups#!topic/nodejs/qTlGXNYIy1U
https://github.com/isaacs/node-supervisor/pull/50

## Develop web application for phonegap?
* On Android:
  * Copy all files and directories of ```webapp-template``` to ```assets``` directory
  * Copy ```cordova-{version}.js``` to ```webapp``` directory
  * On **dev mode**: Set ```super.loadUrl("file:///android_asset/webapp/index.html");```
  * On **prod mode**:
      * Run these commands: ```make resolve```, then ```make install```
      * Set ```super.loadUrl("file:///android_asset/public/index.html");```
  * Packaging:
      * Make sure on prod mode
      * Keep only ```public``` directory
      * Packaging the app as normal Android application and you're done :-)

## Make build lifecycle phrases:

+ clean
+ resolve (dependencies resolver)
+ check-style (check-style-common, check-style-vsf)
+ test (test-common-unit, test-vsf-unit)
+ package
+ install
+ run-dev
+ run-prod
+ run (as same as run-prod)
+ deploy

## Deployment

There are built-in configurations for heroku and dotcloud. Just push this repo and it will be deployed.

## FAQ

+ I get this error below when running ```make run```, ```make run-dev``` or ```make run```:
<pre>
make run-prod
cp -rf webapp public
./node_modules/.bin/r.js -o prod.build.js
make: ./node_modules/.bin/r.js: Command not found
make: *** [install] Error 127
</pre>

=> The node modules are not installed. You need to run: ```make resolve``` first. ```resolve``` target can not make it into ```make run```
as it will involve ```npm install``` and heroku does not allow ```npm`` (?) on deployment. The error is something like this:
<pre>
2012-06-18T19:26:18+00:00 heroku[web.1]: State changed from crashed to created
2012-06-18T19:26:18+00:00 heroku[web.1]: State changed from created to starting
2012-06-18T19:26:20+00:00 heroku[web.1]: Starting process with command `make run`
2012-06-18T19:26:20+00:00 heroku[slugc]: Slug compilation finished
2012-06-18T19:26:20+00:00 app[web.1]: rm -rf public
2012-06-18T19:26:20+00:00 app[web.1]: npm install
2012-06-18T19:26:20+00:00 app[web.1]: make: npm: Command not found
2012-06-18T19:26:20+00:00 app[web.1]: make: *** [resolve] Error 12
</pre>

+ I get this error below when running the command: ```make run-prod```:
<pre>
./node_modules/.bin/r.js -o prod.build.js
./node_modules/.bin/r.js: 1: /bin: Permission denied
</pre>

=> Please make sure you have the project under a directory that you have write permission on files.

+ I get error below when running the command: ```make run```, ```make run-dev``` or ```make run-prod```:
<pre>
Error: listen EADDRINUSE
   at errnoException (net.js:670:11)
   at Array.0 (net.js:771:26)
   at EventEmitter._tickCallback (node.js:190:38)
</pre>

=> You need to change the default port (8080) on server.js to another not used port and it should work.

## Mobile Web App Template
There is [mobile-webapp-template](https://github.com/hoatle/mobile-webapp-template) project basing
on this project which is intended for mobile web application development.

## License
<pre>
/*
 * Copyright (C) hoatle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
</pre>
