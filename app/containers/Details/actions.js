import { SET_STATE } from './constants';

export function setState(detailPage) {
    return {
        type: SET_STATE,
        detailPage,
    };
}
