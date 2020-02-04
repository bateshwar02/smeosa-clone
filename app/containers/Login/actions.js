import { GET_OTP, SUBMIT_OTP, UPDATE_STATUS, UPDATE_PROFILE, SUBMIT_PROFILE, LOGOUT } from './constants';

export function sendOtp(formData, setIsProgress) {
    return {
        type: GET_OTP,
        formData,
        setIsProgress,
    };
}

export function submitOtp(formData, setIsProgress, detailPageUrl, history) {
    return {
        type: SUBMIT_OTP,
        formData,
        setIsProgress,
        detailPageUrl,
        history,
    };
}

export function updateStatus({ step, isOtpSent }) {
    return {
        type: UPDATE_STATUS,
        step,
        isOtpSent,
    };
}

export function updateProfile(profile) {
    return {
        type: UPDATE_PROFILE,
        profile,
    };
}

export function submitProfile(formData, setIsProgress, detailPageUrl, history) {
    return {
        type: SUBMIT_PROFILE,
        formData,
        setIsProgress,
        detailPageUrl,
        history,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}
