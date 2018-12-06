import log from './log';

const show = (fstArg, ...args) => {
  args.push(fstArg);
  log(...args);

  return fstArg;
};

export default show;
