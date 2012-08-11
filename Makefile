TESTS_COMMON_UNIT = test/unit/*.js

TESTS_VSF_UNIT = test/unit/vsf/*.js test/unit/vsf/db/*.js

CHECK_STYLE_COMMON = ./webapp/js/*.js ./webapp/js/controller/*.js ./webapp/js/view/*.js \
                     ./lib/*.js

CHECK_STYLE_VSF = ./webapp/js/lib/vsf/*.js ./webapp/js/lib/vsf/log/*.js ./webapp/js/lib/vsf/store/*.js \
                  ./lib/vsf/*.js ./lib/vsf/db/*.js

REPORTER = list

clean:
	rm -rf public

resolve:
	npm install

check-style-common:
	@echo "Check style for common stuff"
	./node_modules/.bin/jshint ${CHECK_STYLE_COMMON}


check-style-vsf:
	@echo "Check style for vsf stuff "
	./node_modules/.bin/jshint ${CHECK_STYLE_VSF}

check-style: check-style-common check-style-vsf

test-common-unit: clean resolve
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 300 \
		$(TESTS_COMMON_UNIT)

test-vsf-unit: clean resolve
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 300 \
		$(TESTS_VSF_UNIT)

test-unit: test-common-unit test-vsf-unit

test: test-unit

package: clean

install: package
	cp -rf webapp public
	./node_modules/less/bin/lessc webapp/css/application.less webapp/css/application.css
	./node_modules/.bin/r.js -o prod.build.js
	find ./public -type f -name "*.less" -exec rm -f {} \;

run-dev: resolve check-style package
	@NODE_ENV=dev ./node_modules/.bin/supervisor -i node_modules,test,webapp server.js

run-dev-debug: resolve check-style package
	@NODE_ENV=dev ./node_modules/.bin/supervisor -x node-debug -i node_modules,test,webapp server.js

run-prod: install
	@NODE_ENV=prod node server.js

run: run-prod

deploy-dotcloud:
	dotcloud push watpl

deploy-heroku:
	git push heroku master

deploy-appfog:
	af update watpl --no-resources #--no-resources to avoid: Error 402: App packaging failed: 'Failed synchronizing resource pool'

#make sure to have nodester repository for deployment

deploy-nodester:
	git push nodester master

deploy-jitsu:
	jitsu deploy

# This is just the steps to deploy app, the configuration for each hosting services must be done for each service
# before using this short-hand deployment command.

deploy: deploy-dotcloud deploy-heroku deploy-appfog deploy-nodester deploy-jitsu

.DEFAULT_GOAL := resolve

.PHONY: clean, resolve, check-style, test, package, install, run-dev, run-prod, run, deploy