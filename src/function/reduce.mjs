import collectionCall from './internal/collectionCall';

const reduce = (val, ...args) => collectionCall(val, 'reduce', ...args);

export default reduce;
