# webapp-template [![Build Status](https://secure.travis-ci.org/hoatle/webapp-template.png?branch=master)](http://travis-ci.org/hoatle/webapp-template)

Web application structure template for backbone + requirejs + twitter bootstrap running on nodejs server.

## Run the application

+ Make sure to have latest node installed
+ Make sure to have 'make'

+ Test this application: ```make test```

+ Run this application on development mode: ```make run-dev```

+ Run this application on production mode: ```make run-prod```

+ Access application: http://localhost:8080

+ Access browser tests: http://localhost:8080/browser (only on development mode)

+ Package the production application: ```make package```

+ Clean the production application build: ```make clean```

## Make build lifecycle phrases:

+ clean
+ resolve (dependencies resolver)
+ test
+ package
+ install
+ run-dev
+ run-prod
+ run (as same as run-prod)
+ deploy

## Deployment

There are built-in configurations for heroku and dotcloud. Just push this repo and it will be deployed.

## Copyright Notice
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
