/**
 *
 * Bell icon for notification
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ICON = 'M8 0a8 8 0 1 0 0 16A8 8 0 1 0 8 0zM6.532 12.11L3 8.587l1.174-1.174L6.532 9.76l5.284-5.284L13 5.652 6.532 12.11z';

const IconDone = ({ style, size, stylePath, color }) =>
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

IconDone.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconDone.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default memo(IconDone);
