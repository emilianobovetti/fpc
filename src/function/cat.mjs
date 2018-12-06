import first from './first';
import sum from './sum';
import map from './map';

const cat = (...args) =>
  sum(map(args.length > 1 ? args : first(args), String));

export default cat;
