import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Login from '../../containers/Login';
import './header.scss';

const location = {
    list_of_popular_city: [
        { id: '1', name: 'Delhi' },
        { id: '2', name: 'Gujrat' },
        { id: '3', name: 'Haryana' },
        { id: '4', name: 'Madhya Pradesh' },
        { id: '5', name: 'Maharashtra' },
    ],
    other_city: [
        { id: '6', name: 'Andaman & Nicobar Islands' },
        { id: '7', name: ' Andhra Pradesh' },
        { id: '8', name: 'Arunachal Pradesh' },
        { id: '9', name: 'Assam' },
        { id: '10', name: 'Bihar' },
    ],
};

function Header({ toggleMenu, isCustomHeader, type, goBack }) {
    const [isLogin, setLogin] = useState(false);
    const [isLocation, setLocation] = useState(false);

    const closeModal = () => {
        setLogin(false);
        setLocation(false);
    };
    const login = () => {
        setLogin(true);
    };

    const setLocationState = () => {
        setLocation(true);
    };
    const getFooter = () => (
        <div className="getOtpWrapper">
            <span> get OTP </span>
        </div>
    );

    const getLocationFooter = () => <div></div>;

    const childData = array =>
        array.map(item => (
            <span className="item" key={item.id}>
                {item.name}
            </span>
        ));

    const locationData = () =>
        Object.keys(location).map(item => (
            <div className="locationWrapper">
                <div className="cityType">
                    <span className="typeOfCity">{item.replace('_', ' ')}</span>
                    {childData(location[item])}
                </div>
            </div>
        ));

    const detailPageHeader = () => (
        <div className="customHeaderWrap">
            <span
                role="button"
                tabIndex={0}
                className="backIcon"
                onClick={() => {
                    goBack();
                }}
            >
                <i className="material-icons">keyboard_backspace</i>
            </span>
            <span className="header" role="button" tabIndex={0} onClick={setLocationState}>
                {type} In Delhi
            </span>
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

            {isLocation && (
                <Modal
                    modalClass="loginModal"
                    onCancel={closeModal}
                    modalHeader="Select Location"
                    modalContent={locationData()}
                    modalFooter={getLocationFooter()}
                />
            )}
        </header>
    );
}

Header.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    isCustomHeader: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    goBack: PropTypes.func.isRequired,
};

export default Header;
