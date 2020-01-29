import Request from '../../utils/request';
import { REGIONS } from '../../utils/constants';

const Service = {
    getData() {
        const url = `/api/v1/smeosa/categoryAndBrands`;
        return Request.get(url);
    },
    getRegion() {
        // const url = `/api/v1/smeosa/categoryAndBrandsByRegionId/${regionId}`;
        // return Request.get(url);
        return REGIONS;
    },
    getDataByRegion(regionId) {
        const url = `/api/v1/smeosa/categoryAndBrandsByRegionId/${regionId}`;
        return Request.get(url);
    },
    // createContract(data) {
    //     const url = `/api/v1/contract/`;
    //     return Request.post(url, data);
    // },
    // getAuthorityName(query) {
    //     const url = `/api/bidaward/bidaward/purchasers?searchText=${query}`;
    //     return Request.get(url, 'BIDASSIST');
    // },
    // getAnchorId(query) {
    //     const url = `/api/v1/org/organisation/search?query=${query}&filter=STATUS:VERIFIED`;
    //     return Request.get(url);
    // },
    // getCategoryName(query) {
    //     const url = `/api/v2/product/search/categories?query=${query}&isCategoryPage=false`;
    //     return Request.get(url);
    // },
};
export default Service;
