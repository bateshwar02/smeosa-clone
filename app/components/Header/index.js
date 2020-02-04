import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Utils from '../../utils/common';
import { makeSelectAccountDetails } from '../../containers/App/selectors';
import * as Actions from '../../containers/App/action';
import Modal from '../Modal';
import Login from '../../containers/Login';
import City from '../City/Loadable';
import Search from '../Search/Loadable';
import { HOME_PAGE_LOGO, NOTIFICATION } from '../../utils/constants';
import './header.scss';

function Header({ userAccount, region, toggleMenu, isCustomHeader, type, history, homeData, defaultCity, brandImg, isLogin, setLogin, detailPageUrl }) {
    const [isSearch, setIsSearch] = useState(false);
    const [isLocation, setLocation] = useState(false);

    const closeModal = () => {
        setLogin(false);
        setLocation(false);
        setIsSearch(false);
    };
    const login = () => {
        setLogin(true);
    };

    const setLocationState = () => {
        setLocation(true);
    };
    const getLocationFooter = () => <div></div>;
    const locationData = () => <City setStateDate={setLocation} region={region} />;

    const detailPageHeader = () => (
        <div className="detailPageHeader">
            <div className="customHeaderWrap">
                <span
                    role="button"
                    tabIndex={0}
                    className="backIcon"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <i className="material-icons">keyboard_backspace</i>
                </span>
                <span className="header">
                    {type} Prices In {defaultCity}
                </span>
            </div>
            {!Utils.isUndefinedOrNullOrEmpty(brandImg) && (
                <div className="brandHeaderWrap">
                    <span className="selectedBrandImage">
                        <img src={brandImg} alt="" />
                    </span>
                </div>
            )}
        </div>
    );

    // const sidebarPageHeader = () => (
    //     <div className="customHeaderWrap">
    //         <span
    //             role="button"
    //             tabIndex={0}
    //             className="backIcon"
    //             onClick={() => {
    //                 history.goBack();
    //             }}
    //         >
    //             <i className="material-icons">keyboard_backspace</i>
    //         </span>
    //         <span className="header">
    //             {type} In {defaultCity}
    //         </span>
    //     </div>
    // );

    const notification = () => {};

    const getSignInNotification = () => {
        if (!Utils.isUndefinedOrNullOrEmptyObject(userAccount)) {
            return (
                <div className="bellWrapper" onClick={notification} role="button" tabIndex={0}>
                    <span>
                        <img src={NOTIFICATION} alt="Notification" />
                    </span>
                </div>
            );
        }
        return (
            <div className="leftWrapper" onClick={login} role="button" tabIndex={0}>
                <span>Sign in</span>
            </div>
        );
    };

    const searchAction = () => {
        setIsSearch(true);
    };

    const search = () => <Search homePage={homeData} setIsSearch={setIsSearch} />;

    const defaultHeader = () => (
        <div className="headerWrap">
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <button className="toggle-button" onClick={toggleMenu} type="button">
                        <div className="toggle-button__line" />
                        <div className="toggle-button__line" />
                        <div className="toggle-button__line" />
                    </button>
                </div>
                <div className="headerRow">
                    <div className="toolbar__logo">
                        <a href="/">
                            <img src={HOME_PAGE_LOGO} alt="logo" />
                        </a>
                    </div>
                    <div className="locationWrapper" role="button" tabIndex={0} onClick={setLocationState}>
                        <span className="text"> {defaultCity} </span> <i className="material-icons">keyboard_arrow_down</i>
                    </div>
                </div>
                {getSignInNotification()}
            </nav>
            <div className="searchWrapperPic" onClick={searchAction} role="button" tabIndex={0}>
                <i className="material-icons">search</i> <span className="search">Search for category or brand</span>
            </div>
        </div>
    );

    const getChildComponent = () => {
        if (isCustomHeader) {
            return detailPageHeader();
        }
        return defaultHeader();
    };

    return (
        <header className="toolbar">
            {getChildComponent()}
            {isLogin && (
                <Modal
                    modalClass="loginModal"
                    onCancel={closeModal}
                    modalHeader="Let's Get Started"
                    modalContent={<Login setLogin={setLogin} detailPageUrl={detailPageUrl} history={history} />}
                />
            )}
            {isLocation && (
                <Modal
                    modalClass="regionModal"
                    onCancel={closeModal}
                    modalHeader="Select Location"
                    modalContent={!Utils.isUndefinedOrNullOrEmptyList(region) && locationData()}
                    modalFooter={getLocationFooter()}
                />
            )}
            {isSearch && (
                <Modal
                    modalClass="searchModal"
                    onCancel={closeModal}
                    modalHeader=""
                    modalContent={!Utils.isUndefinedOrNullOrEmptyList(homeData) && search()}
                    modalFooter={getLocationFooter()}
                />
            )}
        </header>
    );
}

Header.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    isCustomHeader: PropTypes.bool.isRequired,
    type: PropTypes.string,
    history: PropTypes.object.isRequired,
    homeData: PropTypes.object.isRequired,
    defaultCity: PropTypes.string.isRequired,
    brandImg: PropTypes.string,
    isLogin: PropTypes.bool,
    setLogin: PropTypes.func,
    detailPageUrl: PropTypes.string,
    region: PropTypes.array.isRequired,
    userAccount: PropTypes.object.isRequired,
};
Header.defaultProps = {
    type: '',
    brandImg: '',
    detailPageUrl: '',
    isLogin: false,
    setLogin: () => {},
};

const mapStateToProps = createStructuredSelector({
    userAccount: makeSelectAccountDetails(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(Header);
