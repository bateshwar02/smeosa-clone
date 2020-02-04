const isUndefinedOrNull = value => typeof value === 'undefined' || value === null;

module.exports = (req, res, next) => {
    if (!isUndefinedOrNull(req.headers['auth-token'])) {
        res.cookie('auth-token', req.headers['auth-token']);
    }
    if (!isUndefinedOrNull(req.headers['is-android-app'])) {
        res.cookie('isAndroidApp', req.headers['is-android-app']);
    }
    if (!isUndefinedOrNull(req.headers['organization-id'])) {
        res.cookie('x-ofb-organization', req.headers['organization-id']);
        res.cookie('x-ofb-organisation', req.headers['organization-id']);
    }
    next();
};
