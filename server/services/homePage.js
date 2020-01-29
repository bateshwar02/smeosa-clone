const API = require('../lib/api');

// HOME PAGE
module.exports = {
    getRegions(callback, headers) {
        const url = '/api/v1/smeosa/region';
        return API.get(url, callback, headers);
    },
    getBrandCategory(callback, headers) {
        const url = '/api/v1/smeosa/categoryAndBrands';
        return API.get(url, callback, headers);
    },
};
