import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the details state domain
 */

const selectDetailsDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Details
 */

const makeSetStateDetails = () =>
    createSelector(
        selectDetailsDomain,
        ({ homeData }) => homeData || {},
    );

export default makeSetStateDetails;
export { selectDetailsDomain, makeSetStateDetails };
