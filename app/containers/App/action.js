/*
 * App Actions
 *
 */

import { toast } from 'react-toastify';
import { PAGE_INFO, NOTIFICATION_SUCCESS, NOTIFICATION_ERROR, NOTIFICATION_WARN, IS_LOGIN_INFO } from './constants';

export function updatePageInfo(pageInfo) {
    return {
        type: PAGE_INFO,
        pageInfo,
    };
}

export function updateLoginStatus(loginDetails) {
    return {
        type: IS_LOGIN_INFO,
        loginDetails,
    };
}

export function notifySuccess(msg = 'Success') {
    toast.success(msg);
    return {
        type: NOTIFICATION_SUCCESS,
    };
}

export function notifyError(msg = { message: 'Error' }) {
    toast.error(msg.message);
    return {
        type: NOTIFICATION_ERROR,
    };
}

export function notifyWarn(msg = 'Warning') {
    toast.warn(msg);
    return {
        type: NOTIFICATION_WARN,
    };
}
