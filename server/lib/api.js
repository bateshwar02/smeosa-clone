const fetch = require('node-fetch');
const envConfig = require('config');

const BASE_URL_MAP = {
    DEFAULT: envConfig.get('api.url'),
};

const getBaseUrl = server => {
    if (!server) {
        return BASE_URL_MAP.DEFAULT;
    }
    return BASE_URL_MAP[server.toUpperCase()];
};

const checkStatus = res => {
    if (res.ok) {
        return res;
    }
    throw res.statusText;
};

module.exports = {
    get: (url, callback, headers = {}, beServer) => {
        fetch(getBaseUrl(beServer) + url, { method: 'GET', headers })
            .then(checkStatus)
            .then(res => res.json())
            .then(json => {
                callback(null, json);
            })
            .catch(err => {
                callback({ message: err });
            });
    },
};
