import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Rupees from '../../icons/IconRupee';
import './style.scss';

const data = [
    { unit: '6 MM', rate: '35000' },
    { unit: '10 MM', rate: '70000' },
    { unit: '16 MM', rate: '100000' },
    { unit: '26 MM', rate: '105000' },
    { unit: '36 MM', rate: '205000' },
    { unit: '46 MM', rate: '305000' },
];
function DetailsPage({ type }) {
    const getDetailsDate = () =>
        data.map(item => (
            <div className="content">
                <span className="unitWrap">{item.unit}</span>
                <span className="priceWrap">
                    <Rupees />
                    {item.rate}
                </span>
            </div>
        ));

    return (
        <div className="detailPageContainWrapper">
            <div className="listWrapper">
                <span className="headerName">{type}</span>
                <div className="contentWrapper">
                    <div className="header">
                        <span className="section">Section</span>
                        <span className="unit">Per MT</span>
                    </div>
                    {getDetailsDate()}
                </div>
            </div>
        </div>
    );
}

DetailsPage.propTypes = {
    type: PropTypes.string.isRequired,
};

export default memo(DetailsPage);
