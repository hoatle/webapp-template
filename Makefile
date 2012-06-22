TESTS_UNIT = test/unit/*.js
REPORTER = list

clean:
	rm -rf public

resolve:
	npm install

test: clean resolve
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 300 \
		$(TESTS_UNIT)

package: clean

install: package
	cp -rf webapp public
	./node_modules/.bin/r.js -o prod.build.js

run-dev: package
	@NODE_ENV=dev node server.js

run-prod: install
	@NODE_ENV=prod node server.js

run: run-prod

deploy-dotcloud:
	dotcloud push watpl

deploy-heroku:
	git push heroku master

deploy-appfog:
	af update watpl

#make sure to have nodester repository for deployment
deploy-nodester:
	git push nodester master

deploy-jitsu:
	jitsu deploy

# This is just the steps to deploy app, the configuration for each hosting services must be done for each service
# before using this short-hand deployment command.
deploy: deploy-dotcloud deploy-heroku deploy-appfog deploy-nodester deploy-jitsu

.DEFAULT_GOAL := resolve

.PHONY: clean, resolve, test, package, install, run-dev, run-prod, run, deploy