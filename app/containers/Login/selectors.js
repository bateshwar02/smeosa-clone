import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { STEPS } from './constants';

/**
 * Direct selector to the login state domain
 */

const selectLoginDomain = state => state.login || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeLoginSteps = () =>
    createSelector(
        selectLoginDomain,
        ({ step }) => step || STEPS.LOGIN,
    );

const makeToTakeMobile = () =>
    createSelector(
        selectLoginDomain,
        ({ mobile }) => mobile || '',
    );
const makeSelectIsOtpSent = () =>
    createSelector(
        selectLoginDomain,
        ({ isOtpSent }) => isOtpSent || false,
    );
const makeSelectProfile = () =>
    createSelector(
        selectLoginDomain,
        ({ profile }) => profile || {},
    );

export default makeLoginSteps;
export { makeLoginSteps, makeToTakeMobile, makeSelectIsOtpSent, makeSelectProfile };
