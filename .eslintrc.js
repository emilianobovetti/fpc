module.exports = {
    "env": {
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        //Best Practices
        "complexity": [ "warn", 5 ],
        "curly": [ "error", "all" ],
        "dot-location": [ "error", "property" ],
        "dot-notation": [ "error", { allowKeywords: true } ],
        "eqeqeq": [ "error", "always", { "null": "ignore" } ],
        "max-classes-per-file": [ "error", 1 ],
        "no-magic-numbers": [ "error", { "ignore": [ 0, 1, 2, 3 ] } ],
        "radix": [ "error", "always" ],
        "wrap-iife": [ "error", "outside" ],
        "yoda": [ "error", "never" ],

        // Stylistic Issues
        "array-bracket-newline": [ "error", "consistent" ],
        "array-bracket-spacing": [ "error", "always" ],
        "array-element-newline": [ "error", "consistent" ],
        "block-spacing": [ "error", "always" ],
        "brace-style": [ "error", "1tbs" ],
        "capitalized-comments": [ "error", "always" ],
        "comma-dangle": [ "error", "never" ],
        "computed-property-spacing": [ "error", "never" ],
        "consistent-this": [ "error", "that" ],
        "func-call-spacing": [ "error", "never" ],
        "func-style": [ "error", "expression" ],
        "function-paren-newline": [ "error", "never" ],
        "implicit-arrow-linebreak": "off",
        "indent": [ "error", 2 ],
        "jsx-quotes": [ "error", "prefer-double" ],
        "linebreak-style": [ "error", "unix" ],
        "max-depth": [ "warn", { "max": 4 } ],
        "max-len": [ "warn", { "code": 80, "comments": 110 } ],
        "max-lines": [ "warn", { "max": 200 } ],
        "max-nested-callbacks": [ "warn", { "max": 4 } ],
        "max-params": [ "warn", { "max": 4 } ],
        //"max-statements": [ "warn", { "max": 10 } ],
        "max-statements-per-line": [ "warn", { "max": 1 } ],
        "no-plusplus": [ "error", { "allowForLoopAfterthoughts": true } ],
        "object-curly-newline": [ "error", { "multiline": true } ],
        "object-curly-spacing": [ "error", "always" ],
        "one-var": [ "error", { "uninitialized": "always" } ],
        "one-var-declaration-per-line": [ "error", "initializations" ],
        "operator-assignment": [ "error", "always" ],
        "padded-blocks": [ "error", { "classes": "never" } ],
        "quote-props": [ "error", "as-needed" ],
        "quotes": [ "error", "single" ],
        "semi": [ "error", "always" ],
        "space-before-function-paren": [ "error", "always" ],
        "space-in-parens": [ "error", "never" ],
        "unicode-bom": [ "error", "never" ],

        // Possible Errors
        "for-direction": "error",
        "getter-return": "error",
        "no-await-in-loop": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-console": "off",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-empty-character-class": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-parens": [ "error", "all", { "enforceForArrowConditionals": false }],
        "no-extra-semi": "error",
        "no-func-assign": "error",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-obj-calls": "error",
        "no-prototype-builtins": "error",
        "no-regex-spaces": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "use-isnan": "error",
        "valid-jsdoc": "error",
        "valid-typeof": "error",

        // Best Practices
        "accessor-pairs": "error",
        "array-callback-return": "error",
        "block-scoped-var": "error",
        "class-methods-use-this": "error",
        "consistent-return": "error",
        "default-case": "error",
        "guard-for-in": "error",
        "no-alert": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-div-regex": "error",
        "no-else-return": "error",
        "no-empty-function": "off",
        "no-empty-pattern": "error",
        "no-eq-null": "off",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
        "no-fallthrough": "error",
        "no-floating-decimal": "error",
        "no-global-assign": "error",
        "no-implicit-coercion": "error",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-invalid-this": "error",
        "no-iterator": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-loop-func": "error",
        "no-multi-spaces": "error",
        "no-multi-str": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "error",
        "no-proto": "error",
        "no-redeclare": "error",
        "no-restricted-properties": "error",
        "no-return-assign": "error",
        "no-return-await": "error",
        "no-script-url": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-useless-call": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-warning-comments": "warn",
        "no-with": "error",
        "prefer-promise-reject-errors": "error",
        "require-await": "error",
        "vars-on-top": "error",

        // Variables
        "no-delete-var": "error",
        "no-label-var": "error",
        "no-shadow": "error",
        "no-shadow-restricted-names": "error",
        "no-undef": "error",
        "no-undef-init": "error",
        "no-undefined": "off",
        "no-unused-vars": [ "error", { "argsIgnorePattern": "^_" } ],
        "no-use-before-define": "error",

        // Node.js and CommonJS
        "callback-return": "error",
        "global-require": "error",
        "handle-callback-err": "error",
        "no-buffer-constructor": "error",
        "no-mixed-requires": "error",
        "no-new-require": "error",
        "no-path-concat": "error",
        "no-process-env": "error",
        "no-process-exit": "error",
        "no-sync": "error",

        // Stylistic Issues
        "camelcase": "error",
        "comma-spacing": "error",
        "comma-style": "error",
        "eol-last": "error",
        "func-name-matching": "error",
        "key-spacing": "error",
        "keyword-spacing": "error",
        "line-comment-position": "error",
        "lines-around-comment": [ "error", { "allowClassStart": true } ],
        "lines-between-class-members": "error",
        "multiline-comment-style": "error",
        "multiline-ternary": [ "error", "always-multiline" ],
        "new-cap": [ "error", { "capIsNew": false } ],
        "new-parens": "error",
        "newline-per-chained-call": "error",
        "no-array-constructor": "error",
        "no-bitwise": "error",
        "no-continue": "error",
        "no-inline-comments": "error",
        "no-lonely-if": "error",
        "no-mixed-operators": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-multi-assign": "error",
        "no-multiple-empty-lines": "error",
        "no-negated-condition": "error",
        "no-nested-ternary": "off",
        "no-new-object": "error",
        "no-tabs": "error",
        "no-ternary": "off",
        "no-trailing-spaces": "error",
        "no-underscore-dangle": "error",
        "no-unneeded-ternary": "error",
        "no-whitespace-before-property": "error",
        "nonblock-statement-body-position": "error",
        "object-property-newline": "error",
        "operator-linebreak": "error",
        "padding-line-between-statements": "error",
        "prefer-object-spread": "error",
        "require-jsdoc": "off",
        "semi-spacing": "error",
        "semi-style": "error",
        "sort-keys": "off",
        "sort-vars": "off",
        "space-before-blocks": "error",
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "spaced-comment": "error",
        "switch-colon-spacing": "error",
        "template-tag-spacing": "error",
        "wrap-regex": "error",

        // ECMAScript 6
        "arrow-body-style": [ "error", "as-needed" ],
        "arrow-parens": [ "error", "as-needed" ],
        "arrow-spacing": [ "error", { "before": true, "after": true } ],
        "constructor-super": "error",
        "generator-star-spacing": [ "error", { "before": true, "after": false } ],
        "no-class-assign": "error",
        "no-confusing-arrow": [ "error", { "allowParens": true } ] ,
        "no-const-assign": "error",
        "no-dupe-class-members": "error",
        "no-duplicate-imports": "error",
        "no-new-symbol": "error",
        "no-this-before-super": "error",
        "no-useless-computed-key": "error",
        "no-useless-constructor": "error",
        "no-useless-rename": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-destructuring": "error",
        "prefer-numeric-literals": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "require-yield": "error",
        "rest-spread-spacing": "error",
        "sort-imports": "off",
        "symbol-description": "error",
        "template-curly-spacing": "error",
        "yield-star-spacing": [ "error", "after" ]
    }
};
