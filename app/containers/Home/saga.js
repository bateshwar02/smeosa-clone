import { takeLatest, put, call } from 'redux-saga/effects';

import { notifyError } from '../App/action';
import { getDataByRegion } from './actions';
// import makeSetStateDetails from './selectors';
// import Utils from '../../utils/common';
import { DATA_BY_REGION } from './constants';
import api from './api';

function* getDataByRegionSaga({ regionId }) {
    // const dataByRegion = yield select(makeSetStateDetails());

    try {
        // const dataByRegionClone = Utils.deepCopy(dataByRegion);
        const dataByRegionClone = yield call(api.getDataByRegion, regionId);
        yield put(getDataByRegion(dataByRegionClone));
    } catch (e) {
        yield put(notifyError(e));
    }
}

export default function* toDoSaga() {
    yield takeLatest(DATA_BY_REGION, getDataByRegionSaga);
}
