import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const getLabel = ({ label, breakpoints, htmlFor, id }) => {
    if (label) {
        const className = breakpoints ? breakpoints.getLabelClassName() : {};
        className['control-label'] = true;
        return (
            <label htmlFor={htmlFor} id={id} className={classnames(className)}>
                <span>{label}</span>
            </label>
        );
    }
    return null;
};

getLabel.propTypes = {
    label: PropTypes.string.isRequired,
    breakpoints: PropTypes.object.isRequired,
    htmlFor: PropTypes.string.isRequired,
    id: PropTypes.string,
};

getLabel.defaultProps = {
    id: null,
};

export default getLabel;
