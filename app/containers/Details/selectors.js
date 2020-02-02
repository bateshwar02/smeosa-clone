import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the details state domain
 */

const selectDetailsDomain = state => state.detailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Details
 */

const makeSetStateDetails = () =>
    createSelector(
        selectDetailsDomain,
        ({ detailsData }) => detailsData || {},
    );

export default makeSetStateDetails;
export { selectDetailsDomain, makeSetStateDetails };
