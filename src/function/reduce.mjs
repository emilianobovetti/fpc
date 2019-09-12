import collectionMethodApply from './internal/collectionMethodApply';

const reduce = (val, ...args) => collectionMethodApply(val, 'reduce', args);

export default reduce;
