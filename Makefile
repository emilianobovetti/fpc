# directories
build_dir := $(CURDIR)/dist
node_dir := $(CURDIR)/node_modules
node_bin := $(node_dir)/.bin
docs_dir := $(CURDIR)/docs
# source
source_dir := $(CURDIR)/src
mjs_index := $(source_dir)/index.mjs
# target
api_docs_file := $(docs_dir)/api.md

all : yarn-check build test docs

.PHONY: yarn-check
yarn-check :
ifeq ("$(wildcard $(node_bin))", "")
	@yarn
endif

$(build_dir):
	@mkdir -p $(build_dir)

.PHONY: dev
dev: yarn-check $(build_dir)
	@npx webpack --mode development

.PHONY: build
build: yarn-check $(build_dir)
	@npx webpack --mode production

.PHONY: test
test : yarn-check
	@npx nyc mocha --recursive

.PHONY: docs
docs: $(api_docs_file)

$(api_docs_file): yarn-check
	npx documentation build src/** -f md -o $(api_docs_file)

.PHONY: commit
commit: yarn-check
	@git cz

.PHONY: playground
playground: build
	@node playground.js

.PHONY: clean
clean :
	@rm -rf $(node_dir) $(build_dir)
