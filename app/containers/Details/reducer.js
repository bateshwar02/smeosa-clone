/*
 *
 * Details reducer
 *
 */
import produce from 'immer';
import { SET_STATE, GET_CATEGORY_DETAIL, GET_BRAND_DETAIL, GET_CATEGORY_BY_BRAND } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const detailsReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_STATE:
                delete action.type;
                draft.detailsData = action.detailPage;
                break;
            case GET_CATEGORY_DETAIL:
                draft.detailPage = action.detailPage;
                break;
            case GET_BRAND_DETAIL:
                draft.detailPage = action.detailPage;
                break;
            case GET_CATEGORY_BY_BRAND:
                draft.detailPage = action.detailPage;
                break;
        }
    });

export default detailsReducer;
