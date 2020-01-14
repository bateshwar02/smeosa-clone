import React from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M6,9H4v2h2V9L6,9z M10,9H8v2h2V9L10,9z M14,9h-2v2h2V9L14,9z M16,2h-1V0h-2v2H5V0H3v2H2C0.9,2,0,2.9,0,4l0,14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V4C18,2.9,17.1,2,16,2L16,2z M16,18H2V7h14V18L16,18z';

const IconCalender = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 18 20',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

IconCalender.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconCalender.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default IconCalender;
