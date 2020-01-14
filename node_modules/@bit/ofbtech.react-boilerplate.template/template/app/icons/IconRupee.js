import React from 'react';
import PropTypes from 'prop-types';

const ICON =
    'M16.543 9.9h-1.686c-.112-1.078-.586-1.855-1.197-2.33h2.882c.137 0 .25-.118.25-.264s-.112-.264-.25-.264H9.457c-.137 0-.25.118-.25.264s.112.264.25.264h3.012c.805.157 1.72.867 1.89 2.33H9.457c-.137 0-.25.118-.25.264s.112.264.25.264h4.934c-.01.733-.247 1.328-.712 1.766-1.317 1.24-4.006.923-4.032.92a.25.25 0 0 0-.249.139c-.048.096-.036.213.03.296l4.728 5.797c.05.06.12.09.19.09a.24.24 0 0 0 .163-.064c.104-.095.115-.26.026-.372l-4.34-5.322c.936.026 2.73-.07 3.815-1.09.576-.542.87-1.27.88-2.16h1.653c.137 0 .25-.118.25-.264s-.11-.264-.25-.264z';
const IconRupee = ({ style, size, stylePath, color }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
            viewBox: '0 0 26 26',
        },
        React.createElement('path', {
            style: stylePath,
            d: ICON,
            fill: color,
        }),
    );

IconRupee.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

IconRupee.defaultProps = {
    size: 26,
    color: '#000',
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default IconRupee;
