/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { PAGE_INFO, IS_LOGIN_INFO } from './constants';

// The initial state of the App
export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case PAGE_INFO:
                draft.pageInfo = action.pageInfo;
                break;
            case IS_LOGIN_INFO:
                draft.loginDetails = action.loginDetails;
                break;
        }
    });

export default appReducer;
