import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Rupees from '../../../icons/IconRupee';
import { COMMON, ICON_URL } from '../../../utils/constants';
import Utils from '../../../utils/common';

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
        if (
            !Utils.isUndefinedOrNullOrEmptyObject(categoryData) &&
            !Utils.isUndefinedOrNullOrEmptyObject(categoryData.brandProductPriceMap) &&
            !Utils.isUndefinedOrNullOrEmptyObject(categoryData.brandMap)
        ) {
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
        }
        return getNoDataFound();
    };

    const getBrandDetails = brandDetails => {
        if (
            !Utils.isUndefinedOrNullOrEmptyObject(brandDetails) &&
            !Utils.isUndefinedOrNullOrEmptyObject(brandDetails.productCateoryProductPriceMap) &&
            !Utils.isUndefinedOrNullOrEmptyObject(brandDetails.productCategoryMap)
        ) {
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
        }
        return getNoDataFound();
    };

    const getNoDataFound = () => (
        <div className="nodataFound">
            <span className="image">
                <img src={`${ICON_URL}No Resulr Found_button.svg`} alt="no data found" />
            </span>
            <span className="noDataHeader">Sorry, no Data found!</span>
        </div>
    );

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
