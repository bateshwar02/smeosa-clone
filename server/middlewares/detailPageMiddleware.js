module.exports = (req, res, next) => {
    res.setProp('detailPage', {
        urlParams: req.query,
    });
    next();
};
