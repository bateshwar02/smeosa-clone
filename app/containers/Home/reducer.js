import produce from 'immer';
import { DATA_BY_REGION, SET_HOME_PAGE_DATA } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case DATA_BY_REGION:
                draft.regionId = action.regionId;
                break;
            case SET_HOME_PAGE_DATA:
                delete action.type;
                draft.homeData = action.homePage;
                break;
        }
    });

export default homeReducer;
