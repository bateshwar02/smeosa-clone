import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Login from '../../containers/Login';
import './header.scss';

function Header({ toggleMenu, isCustomHeader }) {
    const [isLogin, setLogin] = useState(false);

    const closeModal = () => {
        setLogin(false);
    };
    const login = () => {
        setLogin(true);
    };
    const getFooter = () => (
        <div className="getOtpWrapper">
            <span> get OTP </span>
        </div>
    );

    const detailPageHeader = () => (
        <div className="customHeaderWrap">
            <span className="backIcon">
                <i className="material-icons">keyboard_backspace</i>
            </span>
            <span className="header">TMT In Delhi</span>
        </div>
    );

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
                        <a href="/">THE LOGO</a>
                    </div>
                    <div className="locationWrapper">
                        <span className="text"> Delhi </span> <i className="material-icons">keyboard_arrow_down</i>
                    </div>
                </div>
                <div className="leftWrapper" onClick={login} role="button" tabIndex={0}>
                    <span>Sign in</span>
                </div>
            </nav>
            <div className="searchWrapper">
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
            <div className="blank"></div>
            {getChildComponent()}
            {isLogin && (
                <Modal modalClass="loginModal" onCancel={closeModal} modalHeader="Let's Get Started" modalContent={<Login />} modalFooter={getFooter()} />
            )}
        </header>
    );
}

Header.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    isCustomHeader: PropTypes.bool.isRequired,
};

export default Header;
