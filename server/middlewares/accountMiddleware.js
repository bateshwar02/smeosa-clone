const Service = require('../services');
module.exports = (req, res, next) => {
    // const pageInfo = res.getProp('pageInfo');
    if (!req.cookies['auth-token'] || !req.cookies.organisationId) {
        next();
        return;
    }

    try {
        Service.getProfileDetails((error, response) => {
            if (error) {
                next();
                return;
                // res.renderError(error);
            }
            res.setProp('loginDetails', response.data);
            next();
        }, res.getRequestHeaders());
    } catch (error) {
        // res.renderError(error);
        console.log('error', error);
        throw error;
    }
};
