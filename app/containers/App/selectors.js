import { createSelector } from 'reselect';

const selectPageInfo = state => state.pageInfo || {};

const selectToDoDomain = state => state.toDo || {};

const makeSelectPageInfo = () =>
    createSelector(
        selectPageInfo,
        pageInfo => pageInfo,
    );

export { selectPageInfo, selectToDoDomain, makeSelectPageInfo };
