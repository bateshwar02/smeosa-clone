const isUndefinedOrNull = value => typeof value === 'undefined' || value === null;
const isUndefinedOrNullOrEmpty = value => isUndefinedOrNull(value) || value === '';

module.exports = (req, res, next) => {
    function throwError(message) {
        // res.logError(`StackTrace: ${message.stack}`);
        throw message;
    }

    (() => {
        res.locals.props = {};
        res.locals.links = [];
    })();

    res.safeStringify = (obj, pretty) => {
        let jsonString;
        if (obj instanceof Set) {
            if (pretty) {
                jsonString = JSON.stringify(Array.from(obj), null, 4);
            } else {
                jsonString = JSON.stringify(Array.from(obj));
            }
        } else if (pretty) {
            jsonString = JSON.stringify(obj, null, 4);
        } else {
            jsonString = JSON.stringify(obj);
        }

        return jsonString;
    };

    res.setProp = (key, value) => {
        if (isUndefinedOrNullOrEmpty(key)) {
            throwError("'key' is required for setting a prop.");
        }

        if (isUndefinedOrNull(res.locals.props)) {
            res.locals.props = {};
        }

        if (typeof value === 'undefined') {
            res.deleteProp(key);
            return;
        }
        res.locals.props[key] = value;
    };

    res.setProps = props => {
        Object.keys(props).forEach(key => res.setProp(key, props[key]));
    };

    res.getProp = key => {
        if (isUndefinedOrNull(key)) {
            throwError("'key' is required for getting a prop.");
        }

        const value = res.locals.props[key];

        return value || null;
    };

    res.getProps = () => res.locals.props;

    res.deleteProp = key => delete res.locals.props[key];

    res.deleteRequestHeader = key => {
        const headers = res.getTemplateOnlyProp('headers');
        if (!isUndefinedOrNull(headers[key])) {
            delete headers[key];
            res.setTemplateOnlyProp('headers', headers);
        }
    };

    res.addRequestHeader = (key, value) => {
        if (isUndefinedOrNullOrEmpty(key)) {
            throwError("'key' is required while a setting header value.");
        }

        if (typeof value === 'undefined' || value === null) {
            res.deleteRequestHeader(key);
            return;
        }

        res.addEntryInServerOnlyProp('headers', { key, value });
    };

    res.getRequestHeaders = () => {
        const headers = res.getTemplateOnlyProp('headers');
        return headers;
    };

    res.getRequestHeader = key => {
        if (isUndefinedOrNullOrEmpty(key)) {
            throwError("'key' is required while a getting header value.");
        }

        const headers = res.getRequestHeaders();

        let value = headers[key];

        if (isUndefinedOrNull(value)) {
            value = null;
        }

        return value;
    };

    res.addEntryInServerOnlyProp = (key, entry) => {
        if (isUndefinedOrNullOrEmpty(key)) {
            throwError("'key' is required for adding server only value.");
        }

        let value = res.getTemplateOnlyProp(key);

        if (isUndefinedOrNull(value)) {
            value = {};
        }

        value[entry.key] = entry.value;

        res.setTemplateOnlyProp(key, value);
    };

    res.setTemplateOnlyProp = (key, value, isStringifyRequired) => {
        let shouldStringify = isStringifyRequired;
        if (isUndefinedOrNullOrEmpty(key)) {
            throwError("'key' is required for setting server only.");
        }

        if (typeof value === 'undefined') {
            res.deleteTemplateOnlyProp(key);
            return;
        }

        if (isUndefinedOrNullOrEmpty(shouldStringify)) {
            shouldStringify = true;
        }

        res.locals[key] = shouldStringify ? res.safeStringify(value) : value;
    };

    res.getTemplateOnlyProp = (key, isParsingRequired) => {
        let shouldParse = isParsingRequired;
        if (isUndefinedOrNullOrEmpty(key)) {
            throwError("'key' is required for getting server only value.");
        }

        let value = res.locals[key];

        if (value) {
            if (isUndefinedOrNullOrEmpty(shouldParse)) {
                shouldParse = true;
            }

            if (shouldParse) {
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    res.logError(`Error in template props parse -- ${e}`);
                }
            }
        }

        return value || null;
    };

    next();
};
