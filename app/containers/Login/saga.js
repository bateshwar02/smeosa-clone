import { takeLatest, call, put } from 'redux-saga/effects';
import { notifySuccess, notifyError } from '../App/action';

import { STEPS, GET_OTP, SUBMIT_OTP, SUBMIT_PROFILE, LOGOUT } from './constants';
import { updateStatus, updateProfile } from './actions';
import api from './api';
import Utils from '../../utils/common';

function* getOtpSaga({ formData, setIsProgress }) {
    try {
        const otpCall = yield call(api.getOtp, formData);
        if (otpCall.success) {
            yield put(updateStatus({ step: STEPS.VERIFY, isOtpSent: true }));
            notifySuccess(otpCall.data);
            setIsProgress(false);
        }
        return;
    } catch (e) {
        updateStatus({ step: STEPS.LOGIN });
        yield put(notifyError(e));
    }
}

function* submitOtpSaga({ formData, setIsProgress, detailPageUrl, history }) {
    try {
        const otpCall = yield call(api.verifyOtp, formData);
        if (otpCall.success) {
            const profile = {};
            profile.step = STEPS.REGISTER;
            profile.token = otpCall.data.token;
            profile.account = otpCall.data.minAccountDto;
            if (!Utils.isUndefinedOrNullOrEmptyObject(otpCall.data.minAccountDto)) {
                yield call(api.setCredential, otpCall.data.token, otpCall.data.minAccountDto.accountId);
            }
            setIsProgress(false);
            if (Utils.isUndefinedOrNullOrEmptyList(otpCall.data.minOrganisationInfoSet)) {
                yield put(updateStatus({ step: STEPS.REGISTER }));
                yield put(updateProfile(profile));
                return;
            }
            yield put(updateStatus({ step: STEPS.SUBMIT }));
            yield put(updateProfile(profile));
            if (!Utils.isUndefinedOrNullOrEmpty(detailPageUrl)) {
                history.push(detailPageUrl);
            }
        }
        return;
    } catch (e) {
        updateStatus({ step: STEPS.LOGIN });
        yield put(notifyError(e));
    }
}

function* submitProfileSaga({ formData, setIsProgress, detailPageUrl, history }) {
    try {
        const otpCall = yield call(api.submitProfile, formData);
        if (otpCall.success) {
            yield put(updateStatus({ step: STEPS.SUBMIT }));
            notifySuccess(otpCall.data);
            if (!Utils.isUndefinedOrNullOrEmpty(detailPageUrl)) {
                history.push(detailPageUrl);
            }
            setIsProgress(false);
        }
        return;
    } catch (e) {
        updateStatus({ step: STEPS.LOGIN });
        yield put(notifyError(e));
    }
}
function* logoutSaga() {
    try {
        yield call(api.logout);
        return;
    } catch (e) {
        updateStatus({ step: STEPS.LOGIN });
        yield put(notifyError(e));
    }
}

export default function* loginSaga() {
    yield takeLatest(GET_OTP, getOtpSaga);
    yield takeLatest(SUBMIT_OTP, submitOtpSaga);
    yield takeLatest(SUBMIT_PROFILE, submitProfileSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}
