# webapp-template [![Build Status](https://secure.travis-ci.org/hoatle/webapp-template.png?branch=master)](http://travis-ci.org/hoatle/webapp-template)

Web application structure template for backbone + requirejs + twitter bootstrap running on nodejs server.

## Run the application

+ Make sure to have latest node installed
+ Make sure to have 'make'

+ Test this application: ```make test```

+ Run this application on development mode: ```make run-dev```

+ Run this application on production mode: ```make run-prod```

+ Access application: http://localhost:3000

+ Access browser tests: http://localhost:3000/browser (only on development mode)

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