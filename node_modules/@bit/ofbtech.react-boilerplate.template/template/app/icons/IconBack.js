/**
 *
 * Back icon for navigation
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ICON = 'M16 7H3.83l5.6-5.6L8 0 0 8l8 8 1.4-1.4L3.83 9H16z';

const IconBack = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 16 16',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

IconBack.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconBack.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default memo(IconBack);
