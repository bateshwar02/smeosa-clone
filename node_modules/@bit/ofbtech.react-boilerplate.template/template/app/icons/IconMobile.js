/**
 *
 * Bell icon for notification
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M20.2,3H9.8A1.8,1.8,0,0,0,8,4.8V25.2A1.8,1.8,0,0,0,9.8,27H20.2A1.8,1.8,0,0,0,22,25.2V4.8A1.8,1.8,0,0,0,20.2,3ZM15,26.1a.9.9,0,1,1,0-1.8.9.9,0,1,1,0,1.8ZM20,23c0,.1-.2.1-.2.1H10.2c-.2,0-.2-.1-.2-.1V5.2c0-.1.2-.1.2-.1h9.6c.2,0,.2.1.2.1Z';
const IconMobile = ({ style, size, stylePath, color }) =>
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

IconMobile.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconMobile.defaultProps = {
    size: 16,
    color: '#20beb3',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default memo(IconMobile);
