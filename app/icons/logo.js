import React from 'react';
import PropTypes from 'prop-types';

const ICON = [
    {
        icon: 'M13,0L13,0c7.18,0,13,5.82,13,13l0,0c0,7.18-5.82,13-13,13l0,0C5.82,26,0,20.18,0,13 l0,0C0,5.82,5.82,0,13,0z',
        fill: '#691DD3',
        index: '1',
    },
    {
        icon:
            'M5.512,0.509l8.389,6.437c0.291,0.233,0.46,0.585,0.46,0.957s-0.169,0.725-0.46,0.957 l-8.488,6.64c-0.371,0.292-0.875,0.345-1.299,0.139c-0.424-0.207-0.692-0.638-0.69-1.109L3.512,1.464C3.511,0.99,3.783,0.559,4.21,0.355S5.144,0.211,5.512,0.509z',
        fill: '#FFFFFF',
        index: '2',
    },
    {
        icon:
            'M2.133,1.408l7.885,5.432c0.669,0.453,0.648,1.333-0.043,1.813l-7.861,5.917 c-0.768,0.533-1.867-0.032-1.837-0.923L0.24,2.371c0.033-0.433,0.289-0.817,0.676-1.014S1.764,1.179,2.133,1.408z',
        fill: '#FFFFFF',
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
    size: 30,
    stylePath: {},
    style: {
        display: 'inline-block',
        verticalAlign: 'middle',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
    },
};

export default iconOfbEnquiry;
