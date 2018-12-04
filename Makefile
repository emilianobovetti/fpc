# docs
api_docs_file := $(CURDIR)/docs/api.md
# build
umd_target := $(abspath $(shell node get-package.js umd:main))
build_dir :=  $(dir $(umd_target))
node_dir := $(CURDIR)/node_modules
node_bin := $(node_dir)/.bin

all : build test docs

$(node_bin):
	@yarn

$(build_dir):
	@mkdir -p $(build_dir)

$(umd_target): $(node_bin) $(build_dir)
	@npx webpack --mode production

$(api_docs_file): $(node_bin)
	@npx documentation build src/** \
		--output $(api_docs_file) \
		--format md

.PHONY: build
build: clean-build $(umd_target)

.PHONY: test
test : $(node_bin)
	@BABEL_ENV=test npx nyc mocha --recursive

.PHONY: docs
docs: clean-docs $(umd_target) $(api_docs_file)

.PHONY: clean-build
clean-build:
	@rm -rf $(build_dir)

.PHONY: clean-node
clean-node:
	@rm -rf $(node_dir)

.PHONY: clean-docs
clean-docs:
	@rm -f $(api_docs_file)

.PHONY: clean
clean : clean-build clean-node clean-docs

.PHONY: dev
dev: $(node_bin) $(build_dir)
	@npx webpack --mode development

.PHONY: commit
commit: build test docs
	@git cz

.PHONY: playground
playground: $(umd_target)
	@node playground.js
