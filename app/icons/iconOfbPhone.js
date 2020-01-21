import React from 'react';
import PropTypes from 'prop-types';

const ICON =
    'm364 0l-216 0c-20 0-37 17-37 37l0 438c0 20 17 37 37 37l216 0c20 0 37-17 37-37l0-438c0-20-17-37-37-37z m-161 23l106 0c3 0 5 4 5 9 0 5-2 9-5 9l-106 0c-3 0-5-4-5-9 0-5 2-9 5-9z m53 452c-13 0-24-10-24-24 0-13 11-23 24-23 13 0 24 10 24 23 0 14-11 24-24 24z m117-81l-234 0 0-331 234 0z';

const iconOfbPhone = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 512 512',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

iconOfbPhone.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

iconOfbPhone.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default iconOfbPhone;
