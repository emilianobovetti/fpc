const repl = require('repl').start();
const fpc = require('./src');

Object.keys(fpc).forEach(key => repl.context[key] = fpc[key]);

repl.context.fpc = fpc;
