import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the city state domain
 */

const selectCityDomain = state => state.city || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by City
 */

const makeSelectCity = () =>
    createSelector(
        selectCityDomain,
        substate => substate,
    );

export default makeSelectCity;
export { selectCityDomain };
