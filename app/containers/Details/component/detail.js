import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Rupees from '../../../icons/IconRupee';
import { COMMON } from '../../../utils/constants';

function DetailsPage({ type, detailsData }) {
    const getCategoryChildData = categoryChildData =>
        categoryChildData.map(item => (
            <div className="content" key={item.productId}>
                <span className="unitWrap">{item.productName}</span>
                <span className="priceWrap">
                    <Rupees />
                    {item.productPrice}
                </span>
            </div>
        ));

    const getCategoryDetail = categoryData => {
        const { brandProductPriceMap, brandMap } = categoryData;
        return Object.keys(brandProductPriceMap).map(val => (
            <div className="listWrapper">
                <span className="headerName">{brandMap[val].brandName}</span>
                <div className="contentWrapper">
                    <div className="header">
                        <span className="section">Section</span>
                        <span className="unit">Per MT</span>
                    </div>
                    {getCategoryChildData(brandProductPriceMap[val])}
                </div>
            </div>
        ));
    };

    const getBrandDetails = brandDetails => {
        const { productCateoryProductPriceMap, productCategoryMap } = brandDetails;
        return Object.keys(productCateoryProductPriceMap).map(val => (
            <div className="listWrapper">
                <span className="headerName">{productCategoryMap[val].brandName}</span>
                <div className="contentWrapper">
                    <div className="header">
                        <span className="section">Section</span>
                        <span className="unit">Per MT</span>
                    </div>
                    {getCategoryChildData(productCateoryProductPriceMap[val])}
                </div>
            </div>
        ));
    };

    return (
        <div className="detailPageContainWrapper">
            {type === COMMON.DETAILS_TYPE.CATEGORY && getCategoryDetail(detailsData.categoryDetails)}
            {type === COMMON.DETAILS_TYPE.BRAND && getBrandDetails(detailsData.brandDetails)}
        </div>
    );
}

DetailsPage.propTypes = {
    type: PropTypes.string.isRequired,
    detailsData: PropTypes.object.isRequired,
};

export default memo(DetailsPage);
