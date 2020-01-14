const API = require('../lib/api');

// TODO
module.exports = {
    getToDos(callback, headers) {
        const url = '/todos';
        return API.get(url, callback, headers);
    },
};
