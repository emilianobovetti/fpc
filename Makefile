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

all : yarn-check test
	@mkdir -p $(build_dir)
	@$(uglifyjs) $(js_source) --compress --mangle > $(min_target)

.PHONY: test
test : yarn-check
	@yarn run test

.PHONY: yarn-check
yarn-check :
ifeq ("$(wildcard $(node_bin))", "")
	@yarn
endif

.PHONY: clean
clean :
	@rm -rf $(node_dir) $(build_dir)
