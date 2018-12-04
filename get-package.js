const pkg = require('./package.json');

process.argv.slice(2).forEach(field => {
  if (pkg[field] !== undefined) {
    console.log(pkg[field]);
  }
});
