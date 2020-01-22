/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import globalReducer from './containers/App/reducer';
import todosReducer from './containers/ToDo/reducer';
import detailPageReducer from './containers/Details/reducer';

import history from './utils/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        toDo: todosReducer,
        detailPage: detailPageReducer,
        pageInfo: globalReducer,
        router: connectRouter(history),
        ...injectedReducers,
    });

    return rootReducer;
}
