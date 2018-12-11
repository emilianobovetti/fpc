import collectionCall from './internal/collectionCall';

const filter = (val, fn) => collectionCall(val, 'filter', fn);

export default filter;
