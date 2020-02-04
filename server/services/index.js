const API = require('../lib/api');

module.exports = {
    getLoggedInDetails(callback, headers) {
        const url = '/api/v1/account/isLoggedIn';
        return API.get(url, callback, headers);
    },
    getProfileDetails(callback, headers) {
        const customHeader = headers;
        delete customHeader.host;
        const url = '/api/v1/account/detail';
        return API.get(url, callback, headers);
    },
};
