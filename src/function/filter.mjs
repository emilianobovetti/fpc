import collectionMethodApply from './internal/collectionMethodApply';

const filter = (val, fn) => collectionMethodApply(val, 'filter', [ fn ]);

export default filter;
