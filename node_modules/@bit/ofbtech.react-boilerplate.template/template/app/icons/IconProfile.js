/**
 *
 * Icon for Buyer sidebar Profile action
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M7,0.3c-3.7,0-6.7,3-6.7,6.7s3,6.7,6.7,6.7c3.7,0,6.7-3,6.7-6.7S10.7,0.3,7,0.3L7,0.3z M7,12.3c-2.9,0-5.3-2.4-5.3-5.3S4.1,1.7,7,1.7s5.3,2.4,5.3,5.3S9.9,12.3,7,12.3L7,12.3z M9.3,6.3c0.6,0,1-0.4,1-1s-0.4-1-1-1s-1,0.4-1,1S8.8,6.3,9.3,6.3L9.3,6.3z M4.7,6.3c0.6,0,1-0.4,1-1s-0.4-1-1-1s-1,0.4-1,1S4.1,6.3,4.7,6.3L4.7,6.3z M7,10.7c1.6,0,2.9-1,3.4-2.3H3.6C4.1,9.7,5.4,10.7,7,10.7L7,10.7z';

const IconProfile = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 14 14',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

IconProfile.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconProfile.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default memo(IconProfile);
