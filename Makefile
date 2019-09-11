umd_target := $(abspath $(shell node get-package.js umd:main))
build_dir :=  $(dir $(umd_target))
node_dir := $(CURDIR)/node_modules
node_bin := $(node_dir)/.bin

.PHONY: all
all: build test

$(node_bin):
	yarn

$(build_dir):
	mkdir -p $(build_dir)

$(umd_target): $(node_bin) $(build_dir)
	npx webpack --mode production

.PHONY: build
build: rm-build-dir $(umd_target)

.PHONY: test
test: $(node_bin)
	BABEL_ENV=test npx nyc mocha --recursive

.PHONY: rm-build-dir
rm-build-dir:
	rm -rf $(build_dir)

.PHONY: clean
clean: rm-build-dir
	rm -rf $(node_dir)

.PHONY: dev
dev: $(node_bin) $(build_dir)
	npx webpack --mode development

.PHONY: playground
playground: $(umd_target)
	node playground.js
