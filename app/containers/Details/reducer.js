/*
 *
 * Details reducer
 *
 */
import produce from 'immer';
import { SET_STATE } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const detailsReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_STATE:
                draft.detailPage = action.detailPage;
                break;
        }
    });

export default detailsReducer;
