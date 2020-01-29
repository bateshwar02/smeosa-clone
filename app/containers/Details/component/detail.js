import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Rupees from '../../../icons/IconRupee';

const data = [
    { unit: '6 MM', rate: '35000', id: '1' },
    { unit: '10 MM', rate: '70000', id: '2' },
    { unit: '16 MM', rate: '100000', id: '3' },
    { unit: '26 MM', rate: '105000', id: '4' },
    { unit: '36 MM', rate: '205000', id: '5' },
    { unit: '46 MM', rate: '305000', id: '6' },
];
function DetailsPage({ type }) {
    const getDetailsDate = () =>
        data.map(item => (
            <div className="content" key={item.id}>
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
