import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Utils from '../../utils/common';
import { makeSelectPageInfo, makeSelectAccountDetails } from '../../containers/App/selectors';
import Navigation from '../../utils/navigation';
import { ICON_URL } from '../../utils/constants';
import * as Actions from '../../containers/Login/actions';
import './sidebar.scss';

function Sidebar({ show, logout, userAccount, setLogin }) {
    const userLogout = () => {
        logout();
        window.location = Navigation.home;
    };
    const isSignIn = () => {
        if (Utils.isUndefinedOrNullOrEmptyObject(userAccount)) {
            return true;
        }
        return false;
    };
    const getUserSignIn = () => (
        <div className="leftWrapper" onClick={() => setLogin()} role="button" tabIndex={0}>
            <span>Sign in</span>
        </div>
    );
    return (
        <nav className={classNames('side-drawer', { open: show })}>
            <div className="userProfile">
                <div className="userDetails">
                    <span className="profileIcon">
                        <img src={`${ICON_URL}User_avatar.svg`} alt="profile" />
                    </span>
                    <span className="profileName">{!Utils.isUndefinedOrNullOrEmptyObject(userAccount) ? userAccount.name : 'Welcome User'}</span>
                </div>
                <div className="leftSideWrapper">
                    {isSignIn() && getUserSignIn()}
                    {/* <span className="edit">Edit</span> */}
                </div>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <span className="icon">
                            <img src={`${ICON_URL}Contact _us.svg`} alt="" />
                        </span>
                        <span className="text">Contact Us</span>
                    </li>
                    <li>
                        <span className="icon">
                            <img src={`${ICON_URL}Share_app_with_friens.svg`} alt="" />
                        </span>
                        <span className="text">Share App with Friends </span>
                    </li>
                    <li>
                        <span className="icon">
                            <img src={`${ICON_URL}AboutUs.svg`} alt="" />
                        </span>
                        <span className="text">About Us</span>
                    </li>
                    <li>
                        <span className="icon">
                            <img src={`${ICON_URL}Terms Of Use.svg`} alt="" />
                        </span>
                        <span className="text">Terms Of Use</span>
                    </li>
                    {!Utils.isUndefinedOrNullOrEmptyObject(userAccount) && (
                        <li>
                            <span className="icon">
                                <img src={`${ICON_URL}LOgOut.svg`} alt="" />
                            </span>
                            <span className="text" onClick={userLogout} role="button" tabIndex={0}>
                                Logout
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    userAccount: PropTypes.object.isRequired,
    setLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    userAccount: makeSelectAccountDetails(),
    authToken: makeSelectPageInfo(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(Sidebar);
