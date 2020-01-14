import React from 'react';
import PropTypes from 'prop-types';

const getError = ({ hasError, error }) => {
    if (hasError && error) {
        return <span className="help-block error-block">{error}</span>;
    }
    return null;
};

getError.propTypes = {
    error: PropTypes.string.isRequired,
    hasError: PropTypes.bool.isRequired,
};

export default getError;
