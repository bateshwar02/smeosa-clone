import Request from '../../utils/request';

const Service = {
    getDetailsDataByBrand(regionId, brandId) {
        const url = `/api/v1/smeosaPricing/pricesByBrand/${regionId}/${brandId}`;
        return Request.get(url);
    },
    getDetailsDataByCategory(regionId, productCategoryId) {
        const url = `/api/v1/smeosaPricing/pricesByCategory/${regionId}/${productCategoryId}`;
        return Request.get(url);
    },
};
export default Service;
