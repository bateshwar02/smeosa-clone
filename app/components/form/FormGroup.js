import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const FormGroup = ({ hasError, className, children }) => {
    const newClass = {
        'form-group': true,
        'has-error': hasError,
    };
    if (className) {
        newClass[className] = true;
    }
    return <div className={classnames(newClass)}>{children}</div>;
};

FormGroup.propTypes = {
    className: PropTypes.string,
    hasError: PropTypes.bool.isRequired,
    children: PropTypes.array.isRequired,
};

FormGroup.defaultProps = {
    className: '',
};

export default FormGroup;
