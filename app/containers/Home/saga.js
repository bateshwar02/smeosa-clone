import { takeLatest, put, call, select } from 'redux-saga/effects';
import { notifyError } from '../App/action';
import { setHomePageData } from './actions';
import makeSetStateDetails from './selectors';
import Utils from '../../utils/common';
import { DATA_BY_REGION, REGION_DATA, BRAND_CATEGORY_DATA, SEARCH_DATA } from './constants';
import api from './api';

function* getDataByRegionSaga({ regionId }) {
    const homePageData = yield select(makeSetStateDetails());
    try {
        const homePageDataClone = Utils.deepCopy(homePageData);
        const apiCallDataByRegions = yield call(api.getDataByRegion, regionId);
        homePageDataClone.brandCategoryData = apiCallDataByRegions.data;
        yield put(setHomePageData(homePageDataClone));
        return;
    } catch (e) {
        yield put(notifyError(e));
    }
}

function* getRegionSaga() {
    const homePageData = yield select(makeSetStateDetails());
    try {
        const homePageDataClone = Utils.deepCopy(homePageData);
        const response = yield call(api.getRegion);
        homePageDataClone.regions = response.data;
        yield put(setHomePageData(homePageDataClone));
        return;
    } catch (e) {
        yield put(notifyError(e));
    }
}
function* getBrandCategoryData() {
    const homePageData = yield select(makeSetStateDetails());
    try {
        const homePageDataClone = Utils.deepCopy(homePageData);
        const response = yield call(api.getData);
        homePageDataClone.brandCategoryData = response.data;
        yield put(setHomePageData(homePageDataClone));
        return;
    } catch (e) {
        yield put(notifyError(e));
    }
}
function* setSearchData({ homePage, id, setIsSearch }) {
    try {
        const homePageDataClone = Utils.deepCopy(homePage);
        const arr = id.split('-');
        const customData = homePageDataClone.brandCategoryData[arr[0]];
        const array = [];
        customData.forEach(item => {
            if (arr[0] === 'smeosaBrandsDtoList' && item.brandId === arr[1]) {
                array.push(item);
            }
            if (arr[0] === 'smeosaProductCategoryDtoList' && item.productCategoryId === arr[1]) {
                array.push(item);
            }
        });
        homePageDataClone.brandCategoryData[arr[0]] = array;
        yield put(setHomePageData(homePageDataClone));
        setTimeout(() => {
            setIsSearch(false);
        }, 1000);
        return;
    } catch (e) {
        yield put(notifyError(e));
    }
}

export default function* toDoSaga() {
    yield takeLatest(DATA_BY_REGION, getDataByRegionSaga);
    yield takeLatest(REGION_DATA, getRegionSaga);
    yield takeLatest(BRAND_CATEGORY_DATA, getBrandCategoryData);
    yield takeLatest(SEARCH_DATA, setSearchData);
}
