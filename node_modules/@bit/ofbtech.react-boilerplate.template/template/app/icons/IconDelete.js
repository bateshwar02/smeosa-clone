import React from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M2.5,39.1c0,0.5,0.4,0.9,0.9,0.9h22.5c0.5,0,0.9-0.4,0.9-0.9V10.3H2.5V39.1L2.5,39.1z M19.6,15.2h3.3v19.4h-3.3V15.2z M13,15.2h3.3v19.4H13V15.2z M6.3,15.2h3.3v19.4H6.3V15.2z M22.1,4.1V0.9c0-0.5-0.4-0.9-0.9-0.9H8C7.5,0,7.1,0.4,7.1,0.9v3.2v0.6v0.6H0.9C0.4,5.2,0,5.6,0,6.1v2.2c0,0.5,0.4,0.9,0.9,0.9h1.5h24.3h1.5c0.5,0,0.9-0.4,0.9-0.9V6.1c0-0.5-0.4-0.9-0.9-0.9h-6.2V4.6V4.1z M18.8,5h-8.3V4.6V4.1V3.3h8.3v0.8v0.6V5z';

const IconDelete = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 30 40',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

IconDelete.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconDelete.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default IconDelete;
