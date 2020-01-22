import { takeLatest, select, put } from 'redux-saga/effects';

import { notifyError } from '../App/action';
import { setState } from './actions';
import makeSetStateDetails from './selectors';
import Utils from '../../utils/common';
import { SET_STATE } from './constants';

function* detailsSaga() {
    const detailPage = yield select(makeSetStateDetails());
    try {
        const detailPageClone = Utils.deepCopy(detailPage);
        yield put(setState(detailPageClone));
    } catch (e) {
        yield put(notifyError(e));
    }
}

export default function* toDoSaga() {
    yield takeLatest(SET_STATE, detailsSaga);
}
