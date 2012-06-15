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

package: test
	cp -rf webapp public
	./node_modules/.bin/r.js -o prod.build.js

install: package


run-dev:
	NODE_ENV=dev node server.js

run-prod: package
	NODE_ENV=prod node server.js

run: run-prod

deploy: package


.PHONY: clean, resolve, test, package, install, run-dev, run-prod, run, deploy