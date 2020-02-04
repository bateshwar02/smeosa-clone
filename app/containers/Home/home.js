import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../utils/common';
import { COMMON, ICON_URL } from '../../utils/constants';
import './home.scss';

function Home({ homePageData, getDetails }) {
    const { smeosaProductCategoryDtoList, smeosaBrandsDtoList, regionId } = homePageData;
    const getCategory = () => {
        if (Utils.isUndefinedOrNullOrEmptyList(smeosaProductCategoryDtoList)) {
            return false;
        }

        return smeosaProductCategoryDtoList.map(item => (
            <div
                className="contentWrapper"
                onClick={() => {
                    getDetails(item.productCategoryName, COMMON.DETAILS_TYPE.CATEGORY, item.productCategoryId, regionId);
                }}
                role="button"
                tabIndex={0}
                key={item.productCategoryId}
            >
                <span className="image">
                    <img src={item.s3UrlPath} alt="tmt description" />
                </span>
                <span className="name">{item.productCategoryName}</span>
            </div>
        ));
    };

    const getBrand = () => {
        if (Utils.isUndefinedOrNullOrEmptyList(smeosaBrandsDtoList)) {
            return false;
        }
        return smeosaBrandsDtoList.map(item => (
            <div
                className="contentWrapper"
                key={item.brandId}
                onClick={() => {
                    getDetails(item.brandName, COMMON.DETAILS_TYPE.BRAND, item.brandId, regionId, item.s3UrlPath);
                }}
                role="button"
                tabIndex={0}
            >
                <img src={item.s3UrlPath} alt="brands" />
            </div>
        ));
    };

    const getNoDataFound = () => (
        <div className="nodataFound">
            <span className="image">
                <img src={`${ICON_URL}No Resulr Found_button.svg`} alt="no data found" />
            </span>
            <span className="noDataHeader">Sorry, no Data found!</span>
        </div>
    );

    if (Utils.isUndefinedOrNullOrEmptyList(smeosaBrandsDtoList) && Utils.isUndefinedOrNullOrEmptyList(smeosaProductCategoryDtoList)) {
        return <div className="homeWrapper">{getNoDataFound()}</div>;
    }

    return (
        <div className="homeWrapper">
            <div className="categoryWrapper">
                <span className="header">Category</span>
                <div className="content row">{getCategory()}</div>
            </div>
            <div className="brandWrapper">
                <span className="header">Brands</span>
                <div className="content row">{getBrand()}</div>
            </div>
        </div>
    );
}

Home.propTypes = {
    homePageData: PropTypes.object.isRequired,
    getDetails: PropTypes.func.isRequired,
};

export default Home;
