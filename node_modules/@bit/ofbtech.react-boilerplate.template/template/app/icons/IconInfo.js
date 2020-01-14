import React from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M15,7a8,8,0,1,0,8,8A8,8,0,0,0,15,7Zm1.7,12.4-1,.3h-.8a2.1,2.1,0,0,1-1.2-.3,1.2,1.2,0,0,1-.4-.8c0-.2.1-.3.1-.5a.8.8,0,0,1,.1-.4l.5-1.7c0-.2.1-.3.1-.5v-.4c0-.2,0-.3-.1-.4H12.7v-.5l1-.3h.8a1.6,1.6,0,0,1,1.1.3.9.9,0,0,1,.4.8v.4a4.3,4.3,0,0,1-.1.5l-.5,1.7a4.3,4.3,0,0,0-.1.5c0,.1-.1.3-.1.4a.5.5,0,0,0,.2.4h1.3Zm-.8-7.2a1.4,1.4,0,0,1-.9.3,1.1,1.1,0,0,1-.8-.3.9.9,0,0,1-.3-.7A1,1,0,0,1,15,10.4a1.4,1.4,0,0,1,.9.3,1.1,1.1,0,0,1,.3.8A.9.9,0,0,1,15.9,12.2Z';
const IconInfo = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 30 30',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

IconInfo.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconInfo.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default IconInfo;
