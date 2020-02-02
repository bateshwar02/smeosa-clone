import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import ClassNames from 'classnames';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import queryString from 'query-string';
import makeSetStateDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
// import Utils from '../../utils/common';
import Header from '../../components/Header/Loadable';
import DetailsPage from './component/detail';
import Loader from '../../components/Loader/Loadable';
import Utils from '../../utils/common';
import { COMMON } from '../../utils/constants';
import './style.scss';

export function Details({ detailsData, history, location, getCategoryDetails, getBrandDetails }) {
    useInjectReducer({ key: 'detailPage', reducer });
    useInjectSaga({ key: 'detailPage', saga });
    const { name, type, regionId, typeId, region, img } = queryString.parse(location.search);
    const [isActive, setIsActive] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [detailsPageData, setDetailsPageData] = useState(detailsData);

    useEffect(() => {
        if (type === COMMON.DETAILS_TYPE.CATEGORY) {
            setIsProcessing(true);
            getCategoryDetails(regionId, typeId, setIsProcessing);
        }
        if (type === COMMON.DETAILS_TYPE.BRAND) {
            getBrandDetails(regionId, typeId);
        }
    }, [getBrandDetails, getCategoryDetails, regionId, type, typeId]);

    useEffect(() => {
        setDetailsPageData(detailsData);
    }, [detailsData]);

    const { categoryDetails, brandDetails } = detailsData;

    const defaultData = id => {
        if (id === 0) {
            const setData = Utils.deepCopy(detailsData);
            setDetailsPageData(setData);
        }
    };

    const getDataByBrand = id => {
        setIsProcessing(true);
        const arr = [];
        const customObject = {};
        Object.keys(brandDetails.productCateoryProductPriceMap).forEach(item => {
            if (item === id) {
                arr.push(brandDetails.productCateoryProductPriceMap[item]);
            }
        });
        arr.forEach(i => {
            customObject[id] = i;
        });
        const setData = Utils.deepCopy(detailsData);
        setData.brandDetails.productCateoryProductPriceMap = customObject;
        setDetailsPageData(setData);
        setIsProcessing(false);
        setIsActive(id);
    };

    const getDataByCategory = id => {
        setIsProcessing(true);
        const arr = [];
        const customObject = {};
        Object.keys(categoryDetails.brandProductPriceMap).forEach(item => {
            if (item === id) {
                arr.push(categoryDetails.brandProductPriceMap[item]);
            }
        });
        arr.forEach(i => {
            customObject[id] = i;
        });
        const setData = Utils.deepCopy(detailsData);
        setData.categoryDetails.brandProductPriceMap = customObject;
        setDetailsPageData(setData);
        setIsProcessing(false);
        setIsActive(id);
    };

    const getMenuList = () => {
        if (type === COMMON.DETAILS_TYPE.CATEGORY) {
            if (!Utils.isUndefinedOrNullOrEmptyObject(categoryDetails) && !Utils.isUndefinedOrNullOrEmptyObject(categoryDetails.brandMap)) {
                return Object.keys(categoryDetails.brandMap).map(item => (
                    <div
                        className={ClassNames('brandsList', { active: isActive === item })}
                        key={item}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            getDataByCategory(item);
                        }}
                    >
                        <span className="brandIcon">
                            <img src={categoryDetails.brandMap[item].s3UrlPath} alt="brands" />
                        </span>
                    </div>
                ));
            }
        }
        if (!Utils.isUndefinedOrNullOrEmptyObject(brandDetails) && !Utils.isUndefinedOrNullOrEmptyObject(brandDetails.productCategoryMap)) {
            return Object.keys(brandDetails.productCategoryMap).map(item => (
                <div
                    className={ClassNames('brandsList', { active: isActive === item })}
                    key={item}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        getDataByBrand(item);
                    }}
                >
                    <span className="brandIcon brandImage">
                        <img src={brandDetails.productCategoryMap[item].s3UrlPath} alt="brands" />
                    </span>
                    <span className="name">{brandDetails.productCategoryMap[item].name}</span>
                </div>
            ));
        }
        return null;
    };
    const menuList = () => (
        <div className="brandWrapper">
            <div
                className={ClassNames('brandsList allWrapper', { active: isActive === 0 })}
                role="button"
                tabIndex={0}
                onClick={() => {
                    defaultData(0);
                }}
            >
                <span className="all">All</span>
                <span className="text">{type === COMMON.DETAILS_TYPE.CATEGORY ? COMMON.DETAILS_FILTER.CATEGORY : COMMON.DETAILS_FILTER.BRAND}</span>
            </div>
            {getMenuList()}
        </div>
    );

    return (
        <>
            <Header toggleMenu={() => {}} isCustomHeader type={name} history={history} defaultCity={region} brandImg={img} />
            <div
                className={ClassNames('pageWrapper', {
                    detailsWrapper: !Utils.isUndefinedOrNullOrEmpty(img),
                    defaultWrapper: Utils.isUndefinedOrNullOrEmpty(img),
                })}
            >
                <div className="detailsPageWrapper">{menuList()}</div>
                {isProcessing && <Loader />}
                {!Utils.isUndefinedOrNullOrEmptyObject(detailsPageData) && <DetailsPage type={type} detailsData={detailsPageData} />}
            </div>
        </>
    );
}

Details.propTypes = {
    detailsData: PropTypes.object,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    getCategoryDetails: PropTypes.func.isRequired,
    getBrandDetails: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    detailsData: makeSetStateDetails(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(Details);
