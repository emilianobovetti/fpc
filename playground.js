const repl = require('repl').start({ useGlobal: true });
const fpc = require('./src');

Object.keys(fpc).forEach(key => repl.context[key] = fpc[key]);

repl.context.fpc = fpc;
