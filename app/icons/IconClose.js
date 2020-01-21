import React from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M14.6,12l8.8-8.8C23.8,2.8,24,2.4,24,1.9s-0.2-1-0.5-1.3c-0.7-0.7-1.9-0.7-2.6,0L12,9.4L3.2,0.6c-0.7-0.7-1.9-0.7-2.6,0s-0.7,1.9,0,2.6L9.4,12l-8.8,8.8c-0.7,0.7-0.7,1.9,0,2.6s1.9,0.7,2.6,0l8.8-8.8l8.8,8.8c0.4,0.4,0.8,0.5,1.3,0.5s1-0.2,1.3-0.5c0.4-0.4,0.5-0.8,0.5-1.3s-0.2-1-0.5-1.3L14.6,12z';

const IconClose = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 24 24',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

IconClose.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconClose.defaultProps = {
    size: 24,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default IconClose;
