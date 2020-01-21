/**
 *
 * Icon for Buyer sidebar Logout action
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M6.6,24h2.2v-2.2H6.6V24L6.6,24z M10.9,24h2.2v-2.2h-2.2V24L10.9,24z M13.1,0h-2.2v10.9h2.2L13.1,0L13.1,0z M17,2.7l-1.6,1.6c1.9,1.1,3.2,3.2,3.2,5.6c0,3.7-2.9,6.6-6.6,6.6s-6.6-3-6.6-6.7c0-2.4,1.3-4.5,3.2-5.6L7,2.6C4.6,4.2,3.2,6.9,3.2,9.8c0,4.8,4,8.8,8.8,8.8s8.8-4,8.8-8.8C20.8,6.9,19.4,4.2,17,2.7L17,2.7z M15.4,24h2.2v-2.2h-2.2V24L15.4,24z';

const IconLogout = ({ style, size, stylePath, color }) =>
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

IconLogout.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconLogout.defaultProps = {
    size: 24,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default memo(IconLogout);
