import produce from 'immer';
import { DATA_BY_REGION } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const detailsReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case DATA_BY_REGION:
                draft.dataByRegion = action.dataByRegion;
                break;
        }
    });

export default detailsReducer;
