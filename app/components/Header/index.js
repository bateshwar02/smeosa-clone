import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Login from '../../containers/Login';
import City from '../../containers/City/Loadable';
import './header.scss';

// const location = {
//     list_of_popular_city: [
//         { id: '1', name: 'Delhi' },
//         { id: '2', name: 'Gujrat' },
//         { id: '3', name: 'Haryana' },
//         { id: '4', name: 'Madhya Pradesh' },
//         { id: '5', name: 'Maharashtra' },
//     ],
//     other_city: [
//         { id: '6', name: 'Andaman & Nicobar Islands' },
//         { id: '7', name: ' Andhra Pradesh' },
//         { id: '8', name: 'Arunachal Pradesh' },
//         { id: '9', name: 'Assam' },
//         { id: '10', name: 'Bihar' },
//     ],
// };

const data = {
    data: [
        {
            regionId: '6620166738686251295',
            regionName: 'Delhi',
            isOfbOperative: true,
            regionType: 'CITY',
        },
        {
            regionId: '6620166738690445600',
            regionName: 'Gujarat',
            isOfbOperative: true,
            regionType: 'CITY',
        },
        {
            regionId: '6620166738690445601',
            regionName: 'Haryana',
            isOfbOperative: true,
            regionType: 'CITY',
        },
        {
            regionId: '6620166738690445602',
            regionName: 'MP',
            isOfbOperative: true,
            regionType: 'CITY',
        },
        {
            regionId: '6620166738694639907',
            regionName: 'Maharashtra',
            isOfbOperative: false,
            regionType: 'CITY',
        },
        {
            regionId: '6620166738862412068',
            regionName: 'AP',
            isOfbOperative: false,
            regionType: 'CITY',
        },
        {
            regionId: '6620166738866606373',
            regionName: 'Assam',
            isOfbOperative: false,
            regionType: 'CITY',
        },
        {
            regionId: '6620166738866606374',
            regionName: 'Andaman islands',
            isOfbOperative: false,
            regionType: 'CITY',
        },
    ],
    success: true,
    errorMessage: null,
    errorCode: null,
    meta: null,
};

function Header({ toggleMenu, isCustomHeader, type, goBack, getCategoryBrandDataByRegion }) {
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

    // const childData = array =>
    //     array.map(item => (
    //         <span className="item" key={item.id}>
    //             {item.name}
    //         </span>
    //     ));

    const locationData = () => <City cityData={data} getCategoryBrandDataByRegion={getCategoryBrandDataByRegion} />;
    // Object.keys(location).map(item => (
    //     <div className="locationWrapper">
    //         <div className="cityType">
    //             <span className="typeOfCity">{item.replace('_', ' ')}</span>
    //             {childData(location[item])}
    //         </div>
    //     </div>
    // ));

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
            <span className="header">{type} In Delhi</span>
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
                    <div className="locationWrapper" role="button" tabIndex={0} onClick={setLocationState}>
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
                    modalClass="regionModal"
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
    getCategoryBrandDataByRegion: PropTypes.func.isRequired,
};

export default Header;
