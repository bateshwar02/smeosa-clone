import { takeLatest, call, put } from 'redux-saga/effects';
import { notifySuccess, notifyError } from '../App/action';

import { STEPS, GET_OTP, SUBMIT_OTP, SUBMIT_PROFILE, LOGOUT } from './constants';
import { updateStatus, updateProfile } from './actions';
import api from './api';
import Utils from '../../utils/common';
import Navigation from '../../utils/navigation';

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
        setIsProgress(false);
    }
}

function* submitOtpSaga({ formData, setIsProgress, detailPageUrl }) {
    try {
        const otpCall = yield call(api.verifyOtp, formData);
        if (otpCall.success) {
            const profile = {};
            profile.step = STEPS.REGISTER;
            profile.token = otpCall.data.token;
            profile.account = otpCall.data.minAccountDto;
            if (!Utils.isUndefinedOrNullOrEmptyObject(otpCall.data.minOrganisationInfoSet)) {
                yield call(api.setCredential, otpCall.data.token, otpCall.data.minOrganisationInfoSet[0].organisationId);
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
                window.location = detailPageUrl;
                return;
                // history.push(detailPageUrl);
            }
            window.location = Navigation.home;
        }
        return;
    } catch (e) {
        updateStatus({ step: STEPS.LOGIN });
        setIsProgress(false);
        yield put(notifyError(e));
    }
}

function* submitProfileSaga({ formData, setIsProgress, detailPageUrl }) {
    try {
        const formCopy = Utils.deepCopy(formData);
        const otpCall = yield call(api.submitProfile, formCopy);
        if (otpCall.success) {
            yield put(updateStatus({ step: STEPS.SUBMIT }));
            notifySuccess(otpCall.data);
            if (!Utils.isUndefinedOrNullOrEmptyObject(otpCall.data.minOrganisationInfo)) {
                yield call(api.setCredential, formCopy.token, otpCall.data.minOrganisationInfo.organisationId);
            }
            if (!Utils.isUndefinedOrNullOrEmpty(detailPageUrl)) {
                window.location = detailPageUrl;
                return;
                // history.push(detailPageUrl);
            }
            window.location = Navigation.home;
            setIsProgress(false);
        }
        return;
    } catch (e) {
        updateStatus({ step: STEPS.LOGIN });
        setIsProgress(false);
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
