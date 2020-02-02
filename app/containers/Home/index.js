import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Home from './home';
import makeSetStateDetails from './selectors';
import * as Actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Utils from '../../utils/common';
import { COMMON, LANDING_PAGE_LOGO, ICON_URL, authToken } from '../../utils/constants';

export function HomePage({ homeData, getCategoryBrandData, history, getRegion }) {
    useInjectReducer({ key: 'homePage', reducer });
    useInjectSaga({ key: 'homePage', saga });

    const [region, setRegion] = useState();
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const [isLoadLandingPage, setIsLoadLandingPage] = useState(true);
    const [brandCategory, setBrandCategory] = useState({});
    const [defaultCity, setDefaultCity] = useState('');
    const [isLogin, setLogin] = useState(false);
    const [detailPageUrl, setDetailPageUrl] = useState('');

    useEffect(() => {
        getRegion();
    }, [getRegion]);

    useEffect(() => {
        getCategoryBrandData();
    }, [getCategoryBrandData]);

    useEffect(() => {
        if (!Utils.isUndefinedOrNullOrEmptyObject(homeData.brandCategoryData)) {
            setBrandCategory(homeData.brandCategoryData);
            setIsLoadLandingPage(false);
        }
        if (!Utils.isUndefinedOrNullOrEmptyObject(homeData.regions)) {
            setRegion(homeData.regions);
        }
    }, [homeData.brandCategoryData, homeData.regions]);

    useEffect(() => {
        const { brandCategoryData } = homeData;
        if (!Utils.isUndefinedOrNullOrEmptyObject(brandCategoryData) && !Utils.isUndefinedOrNullOrEmptyList(region)) {
            const regionArray = region.filter(item => item.regionId === brandCategoryData.regionId);
            setDefaultCity(regionArray[0].regionName);
        }
    }, [homeData, region]);

    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(prevState => ({ sideDrawerOpen: !prevState.sideDrawerOpen }));
    };

    const backdropClickHandler = () => {
        setSideDrawerOpen(false);
    };

    const getDetails = (name, type, typeId, regionId, image) => {
        let url = `/details?type=${type}&name=${name}&region=${defaultCity}&regionId=${regionId}&typeId=${typeId}`;
        if (type === COMMON.DETAILS_TYPE.BRAND && !Utils.isUndefinedOrNullOrEmpty(image)) {
            url = `${url}&img=${image}`;
        }
        if (!Utils.isUndefinedOrNullOrEmpty(authToken)) {
            history.push(url);
            return;
        }
        setDetailPageUrl(url);
        setLogin(true);
    };

    const getLandingPage = () => (
        <div className="landingPageWrapper">
            <div className="logo">
                <span className="logoImage">
                    <img src={LANDING_PAGE_LOGO} alt="landing page logo" />
                </span>
            </div>
            <div className="footer">
                <span className="footerImage">
                    <img src={`${ICON_URL}Patter_splash_screen.png`} alt="Footer Page" />
                </span>
            </div>
        </div>
    );

    const backDrop = () => <div className="backdrop" onClick={backdropClickHandler} role="button" tabIndex={0} />;

    if (isLoadLandingPage) {
        return getLandingPage();
    }
    return (
        <section className="pageWrapper">
            <Header
                toggleMenu={drawerToggleClickHandler}
                isCustomHeader={false}
                history={history}
                defaultCity={defaultCity}
                isLogin={isLogin}
                setLogin={setLogin}
                detailPageUrl={detailPageUrl}
            />
            <Sidebar show={sideDrawerOpen} />
            <div className="contentDataWrapper">
                <Home homePageData={brandCategory} getDetails={getDetails} />
            </div>
            {sideDrawerOpen && backDrop()}
        </section>
    );
}

HomePage.propTypes = {
    homeData: PropTypes.object.isRequired,
    getCategoryBrandData: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    getRegion: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    homeData: makeSetStateDetails(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(HomePage);
