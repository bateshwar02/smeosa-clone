import { DATA_BY_REGION, SET_HOME_PAGE_DATA, REGION_DATA, BRAND_CATEGORY_DATA } from './constants';

export function setHomePageData(homePage) {
    return {
        type: SET_HOME_PAGE_DATA,
        homePage,
    };
}

export function getCategoryBrandData() {
    return {
        type: BRAND_CATEGORY_DATA,
    };
}

export function getDataByRegionId(data) {
    return {
        type: DATA_BY_REGION,
        regionId: data,
    };
}

export function getRegion() {
    return {
        type: REGION_DATA,
    };
}
