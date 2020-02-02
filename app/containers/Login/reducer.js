import produce from 'immer';
import { GET_OTP, UPDATE_STATUS, UPDATE_PROFILE, SUBMIT_PROFILE } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case GET_OTP:
                draft.formData = action.formData;
                break;
            case UPDATE_STATUS:
                draft.step = action.step;
                break;
            case UPDATE_PROFILE:
                draft.profile = action.profile;
                break;
            case SUBMIT_PROFILE:
                draft.formData = action.formData;
                break;
        }
    });

export default loginReducer;
