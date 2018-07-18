# directories
base_dir := $(CURDIR)
build_dir := $(base_dir)/dist
node_dir := $(base_dir)/node_modules
node_bin := $(node_dir)/.bin
# source
js_source := $(base_dir)/src/fpc.js
# target
min_target := $(build_dir)/fpc.min.js
# node_modules executables
uglifyjs := $(node_bin)/uglifyjs
eslint := $(node_bin)/eslint

all : yarn-check linter test minifier

.PHONY: yarn-check
yarn-check :
ifeq ("$(wildcard $(node_bin))", "")
	@yarn
endif

.PHONY: linter
linter : yarn-check
	@$(eslint) $(js_source)

.PHONY: test
test : yarn-check
	@yarn run test

.PHONY: minifier
minifier : yarn-check
	@mkdir -p $(build_dir)
	@$(uglifyjs) $(js_source) -c properties=false -m > $(min_target)

.PHONY: clean
clean :
	@rm -rf $(node_dir) $(build_dir)
