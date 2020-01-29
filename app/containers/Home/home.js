import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../utils/common';
import './home.scss';

function Home({ homePageData, history }) {
    const getDetails = val => {
        history.push(`/details?type=${val}`);
    };
    const getCategory = () => {
        const { smeosaProductCategoryList } = homePageData;

        if (Utils.isUndefinedOrNullOrEmptyList(smeosaProductCategoryList)) {
            return false;
        }

        return smeosaProductCategoryList.map(item => (
            <div
                className="contentWrapper"
                onClick={() => {
                    getDetails(item.name);
                }}
                role="button"
                tabIndex={0}
                key={item.productCategoryId}
            >
                <span className="image">
                    <img src={item.s3UrlPath} alt="tmt description" />
                </span>
                <span className="name">{item.name}</span>
            </div>
        ));
    };

    const getBrand = () => {
        const { smeosaBrandsDtoList } = homePageData;
        if (Utils.isUndefinedOrNullOrEmptyList(smeosaBrandsDtoList)) {
            return false;
        }
        return smeosaBrandsDtoList.map(item => (
            <div className="contentWrapper" key={item.brandId}>
                <img src={item.s3UrlPath} alt="brands" />
            </div>
        ));
    };

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
    history: PropTypes.object.isRequired,
};

export default Home;
