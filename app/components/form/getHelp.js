import React from 'react';
import PropTypes from 'prop-types';

const getHelp = ({ help, attrs }) => {
    if (help) {
        return (
            <span className="help-block" id={`${attrs.id}-tip'`}>
                {help}
            </span>
        );
    }
    return null;
};

getHelp.propTypes = {
    help: PropTypes.string.isRequired,
    attrs: PropTypes.object.isRequired,
};

export default getHelp;
