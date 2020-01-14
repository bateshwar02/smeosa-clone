import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the toDo state domain
 */

const selectToDoDomain = state => state.toDo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ToDo
 */

const makeSelectToDos = () =>
    createSelector(
        selectToDoDomain,
        ({ todos }) => todos,
    );

const makeSelectFilter = () =>
    createSelector(
        selectToDoDomain,
        ({ filter }) => filter,
    );

const makeSelectSearchQuery = () =>
    createSelector(
        selectToDoDomain,
        ({ searchQuery }) => searchQuery,
    );

export default makeSelectToDos;
export { selectToDoDomain, makeSelectFilter, makeSelectSearchQuery };
