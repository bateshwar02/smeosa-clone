/**
 *
 * Icon for Buyer sidebar Profile action
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M39.995,20.342c0.19-11.044-8.609-20.15-19.654-20.339C9.298-0.186,0.192,8.614,0.003,19.658 C-0.104,25.92,2.687,31.548,7.13,35.29c0.291-0.253,0.603-0.486,0.95-0.675l5.968-3.255c0.195-0.107,0.372-0.238,0.528-0.389 c0.467-0.453,0.741-1.081,0.741-1.75v-2.445c0,0-1.752-2.095-2.42-5.006c-0.554-0.359-0.925-0.978-0.925-1.684V17.41c0-0.589,0.262-1.115,0.669-1.483v-3.869c0,0-0.795-6.02,7.359-6.02c2.039,0,3.518,0.376,4.59,0.941c3.217,1.693,2.77,5.08,2.77,5.08v3.869c0.407,0.368,0.669,0.894,0.669,1.483v2.676c0,0.9-0.604,1.657-1.423,1.909c-0.457,1.42-1.115,2.773-1.986,4.003c-0.22,0.31-0.425,0.573-0.604,0.777v2.507c0,0.923,0.521,1.767,1.347,2.18l6.371,3.185l0.018,0.009l0,0l0.001,0.001c0.383,0.191,0.729,0.433,1.048,0.702C37.108,31.766,39.892,26.393,39.995,20.342z';

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
    color: '#25D1C5',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default memo(IconProfile);
