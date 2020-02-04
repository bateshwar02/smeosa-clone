import { SET_STATE, GET_CATEGORY_DETAIL, GET_BRAND_DETAIL } from './constants';

export function setState(detailPage) {
    return {
        type: SET_STATE,
        detailPage,
    };
}

export function getCategoryDetails(regionId, typeId, setIsProcessing) {
    return {
        type: GET_CATEGORY_DETAIL,
        regionId,
        typeId,
        setIsProcessing,
    };
}

export function getBrandDetails(regionId, typeId, setIsProcessing) {
    return {
        type: GET_BRAND_DETAIL,
        regionId,
        typeId,
        setIsProcessing,
    };
}
