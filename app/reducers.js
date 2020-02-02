/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import globalReducer from './containers/App/reducer';
import homePageReducer from './containers/Home/reducer';
import detailPageReducer from './containers/Details/reducer';
import LoginReducer from './containers/Login/reducer';

import history from './utils/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        homePage: homePageReducer,
        detailPage: detailPageReducer,
        login: LoginReducer,
        pageInfo: globalReducer,
        router: connectRouter(history),
        ...injectedReducers,
    });

    return rootReducer;
}
