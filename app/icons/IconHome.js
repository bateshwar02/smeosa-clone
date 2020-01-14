/**
 *
 * Icon for Buyer sidebar Home action
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ICON = 'M6.4,13.6V8.8h3.2v4.8h4V7.2H16L8,0L0,7.2h2.4v6.4H6.4z';

const IconHome = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 16 14',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

IconHome.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconHome.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default memo(IconHome);
