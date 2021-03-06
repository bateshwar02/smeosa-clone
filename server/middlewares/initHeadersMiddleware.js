const envConfig = require('config');

module.exports = (req, res, next) => {
    res.setTemplateOnlyProp('headers', req.headers ? JSON.parse(JSON.stringify(req.headers)) : {});
    res.addRequestHeader('X-OFB-TOKEN', req.cookies['auth-token'] || res.getTemplateOnlyProp('x-ofb-token'));
    res.addRequestHeader('X-OFB-IP', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    res.addRequestHeader('X-OFB-ORGANISATION', req.cookies.organisationId);
    res.addRequestHeader('Content-Type', 'application/json');

    const pageInfo = {
        path: req.path,
        query: req.query,
        env: envConfig.get('env'),
        host: req.hostname || '',
        domain: envConfig.get('domain'),
        platform: envConfig.get('platform'),
    };

    res.setProp('pageInfo', pageInfo);
    next();
};
