/**
 *
 * DropDownArrow icon
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ICON = 'M7.3,3.6H0L3.6,0L7.3,3.6z M7.2,8.5L3.6,12L0.1,8.5H7.2z';

const IconDropDownArrow = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 8 12',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

IconDropDownArrow.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconDropDownArrow.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default memo(IconDropDownArrow);
