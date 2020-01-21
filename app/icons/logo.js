import React from 'react';
import PropTypes from 'prop-types';

const ICON = [
    {
        icon:
            'M236.417,123.818L109.425,50.991C87.561,38.444,69.82,48.72,69.82,73.944V219.13c0,25.207,17.741,35.47,39.605,22.938l126.999-72.814C258.281,156.71,258.281,136.363,236.417,123.818z',
        fill: '#B9A9FA',
        index: '1',
    },
    {
        icon:
            'M174.709,144.416L73.391,86.312c-17.444-10.01-31.598-1.812-31.598,18.313v115.834c0,20.111,14.154,28.299,31.598,18.301l101.324-58.093C192.153,170.658,192.153,154.424,174.709,144.416z',
        fill: '#7DE9CD',
        index: '2',
    },
];

const iconOfbEnquiry = ({ style, size, stylePath }) =>
    React.createElement(
        'svg',
        {
            style,
            width: size,
            height: size,
        },
        ICON.map(item =>
            React.createElement('path', {
                key: item.index,
                style: stylePath,
                d: item.icon,
                fill: item.fill,
            }),
        ),
    );

iconOfbEnquiry.propTypes = {
    size: PropTypes.number,
    stylePath: PropTypes.object,
    style: PropTypes.object,
};

iconOfbEnquiry.defaultProps = {
    size: 16,
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
    },
};

export default iconOfbEnquiry;
