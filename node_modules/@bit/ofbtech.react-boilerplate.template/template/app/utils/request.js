import Utils from './common';

const BASE_URL_MAP = {
    DEFAULT: '{_apiUrl}',
};

const getBaseUrl = server => {
    if (Utils.isUndefinedOrNullOrEmpty(server)) {
        return BASE_URL_MAP.DEFAULT;
    }
    return BASE_URL_MAP[server.toUpperCase()];
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    try {
        return response.json();
    } catch (e) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    if (response.success) {
        return response;
    }
    const error = new Error(response.errorMessage);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {
    return fetch(url, options)
        .then(parseJSON)
        .then(checkStatus);
}

const getHeaders = (header, contentType) => {
    let headers = {};
    headers['X-REFERRER-DOMAIN'] = '{_domain}';
    if (header) {
        headers = Object.assign(headers, header);
    }
    headers['Content-type'] = contentType || 'application/json';
    return headers;
};

const getDocHeaders = header => {
    let headers = {};
    headers['X-REFERRER-DOMAIN'] = '{_domain}';
    if (header) {
        headers = Object.assign(headers, header);
    }
    return headers;
};

export default {
    get(url, beServer, header) {
        return request(getBaseUrl(beServer) + url, { method: 'GET', headers: getHeaders(header) });
    },
    post(url, data, beServer, contentType, header) {
        let body = data;
        if (contentType !== 'application/octet-stream') {
            body = JSON.stringify(data);
        }

        return request(getBaseUrl(beServer) + url, { method: 'POST', headers: getHeaders(header, contentType), body });
    },
    put(url, data, beServer, header) {
        return request(getBaseUrl(beServer) + url, { method: 'PUT', headers: getHeaders(header), body: JSON.stringify(data) });
    },
    patch(url, data, beServer, header) {
        return request(getBaseUrl(beServer) + url, { method: 'PATCH', headers: getHeaders(header), body: JSON.stringify(data) });
    },
    delete(url, data, beServer, header) {
        return request(getBaseUrl(beServer) + url, { method: 'DELETE', headers: getHeaders(header), body: JSON.stringify(data) });
    },
    upload(url, data, progressCallback, beServer, headers = {}) {
        return request(getBaseUrl(beServer) + url, { method: 'POST', headers: getDocHeaders(headers), body: data });
    },
};
