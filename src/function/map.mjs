import collectionCall from './internal/collectionCall';

const map = (val, fn) => collectionCall(val, 'map', fn);

export default map;
