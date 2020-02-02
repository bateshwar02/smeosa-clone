import Request from '../../utils/request';

const Service = {
    getData() {
        const url = `/api/v1/smeosa/categoryAndBrands`;
        return Request.get(url);
    },
    getRegion() {
        const url = `/api/v1/smeosa/region`;
        return Request.get(url);
    },
    getDataByRegion(regionId) {
        const url = `/api/v1/smeosa/categoryAndBrandsByRegionId/${regionId}`;
        return Request.get(url);
    },
};
export default Service;
