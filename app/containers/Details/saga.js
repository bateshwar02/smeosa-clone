import { takeLatest, select, put, call } from 'redux-saga/effects';

import { notifyError } from '../App/action';
import { setState } from './actions';
import makeSetStateDetails from './selectors';
import Utils from '../../utils/common';
import { GET_CATEGORY_DETAIL, GET_BRAND_DETAIL } from './constants';
import api from './api';

function* categoryDetailsSaga({ regionId, typeId, setIsProcessing }) {
    const detailPage = yield select(makeSetStateDetails());
    try {
        const detailPageClone = Utils.deepCopy(detailPage);
        const apiCall = yield call(api.getDetailsDataByCategory, regionId, typeId);
        detailPageClone.categoryDetails = apiCall.data;
        yield put(setState(detailPageClone));
        setIsProcessing(false);
    } catch (e) {
        yield put(notifyError(e));
    }
}

function* brandDetailsSaga({ regionId, typeId }) {
    const detailPage = yield select(makeSetStateDetails());
    try {
        const detailPageClone = Utils.deepCopy(detailPage);
        const apiCall = yield call(api.getDetailsDataByBrand, regionId, typeId);
        detailPageClone.brandDetails = apiCall.data;
        yield put(setState(detailPageClone));
    } catch (e) {
        yield put(notifyError(e));
    }
}

export default function* toDoSaga() {
    yield takeLatest(GET_CATEGORY_DETAIL, categoryDetailsSaga);
    yield takeLatest(GET_BRAND_DETAIL, brandDetailsSaga);
}
