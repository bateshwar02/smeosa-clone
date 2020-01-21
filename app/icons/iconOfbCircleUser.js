import React from 'react';
import PropTypes from 'prop-types';

const ICON =
    'm256 12c135 0 244 107 244 244 0 131-111 242-244 242-133 2-244-109-244-240 0-137 109-244 244-246z m164 385c78-84 72-221-14-303-87-82-226-78-308 6-80 86-84 224-6 297 29-98 96-139 193-129 71 11 114 60 135 129z m-248-239c0-47 37-84 84-84 47 0 84 35 84 84 0 47-35 84-84 84-47 0-84-37-84-84z';

const iconOfbCircleUser = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 512 512',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

iconOfbCircleUser.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

iconOfbCircleUser.defaultProps = {
    size: 16,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default iconOfbCircleUser;
