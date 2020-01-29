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

export function HomePage({ homeData, getCategoryBrandData, history }) {
    useInjectReducer({ key: 'homePage', reducer });
    useInjectSaga({ key: 'homePage', saga });

    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const [isLoadLandingPage, setIsLoadLandingPage] = useState(true);
    const [brandCategory, setBrandCategory] = useState({});

    useEffect(() => {
        getCategoryBrandData();
    }, [getCategoryBrandData]);

    useEffect(() => {
        if (!Utils.isUndefinedOrNullOrEmptyObject(homeData.brandCategoryData)) {
            setBrandCategory(homeData.brandCategoryData);
            setIsLoadLandingPage(false);
        }
    }, [homeData.brandCategoryData]);

    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(prevState => ({ sideDrawerOpen: !prevState.sideDrawerOpen }));
    };

    const backdropClickHandler = () => {
        setSideDrawerOpen(false);
    };

    const getLandingPage = () => (
        <div className="landingPageWrapper">
            <div className="logo"></div>
            <div className="logoText">
                <span className="header">SMEosa</span>
                <span className="text">Metal Pricing Engine</span>
            </div>
        </div>
    );

    const backDrop = () => <div className="backdrop" onClick={backdropClickHandler} role="button" tabIndex={0} />;

    if (isLoadLandingPage) {
        return getLandingPage();
    }

    return (
        <section className="pageWrapper">
            <Header toggleMenu={drawerToggleClickHandler} isCustomHeader={false} history={history} />
            <Sidebar show={sideDrawerOpen} />
            <div className="contentDataWrapper">
                <Home homePageData={brandCategory} history={history} />
            </div>
            {sideDrawerOpen && backDrop()}
        </section>
    );
}

HomePage.propTypes = {
    homeData: PropTypes.object.isRequired,
    getCategoryBrandData: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
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
