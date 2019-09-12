import collectionMethodApply from './internal/collectionMethodApply';

const map = (val, fn) => collectionMethodApply(val, 'map', [ fn ]);

export default map;
