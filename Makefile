install: install-deps install-flow-typed

build:
	rm -rf dist
	NODE_ENV=production npx webpack

install-deps:
	npm install

develop::
	npx webpack-dev-server --open

lint:
	npx eslint .

publish:
	npm publish 

.PHONY: test