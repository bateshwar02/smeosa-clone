import React from 'react';
import FormGroup from './FormGroup';

const renderFormGroup = (children, { path, hasError, isPristine }) => {
    let className = `form-group-depth-${path.length}`;
    if (path.length > 0) {
        className += ` form-group-${path.join('-')}`;
    }
    return React.createElement.apply(null, [FormGroup, { className, hasError, isPristine }].concat(children));
};

export default renderFormGroup;
