/**
 *
 * Bell icon for notification
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M9.1,21.4H0.5v-1.3l2.8-2v-6.7c0-4.1,2.3-7.5,6.4-8.5V2c0-1.1,1-2,2.2-2s2.2,0.9,2.2,2v0.9c4.1,0.9,6.4,4.4,6.4,8.5V18l2.8,2v1.3h-8.5c0,1.4-1.3,2.7-2.8,2.7C10.4,24.1,9.1,23,9.1,21.4';

const IconBell = ({ style, size, stylePath, color }) =>
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

IconBell.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconBell.defaultProps = {
    size: 24,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default memo(IconBell);
