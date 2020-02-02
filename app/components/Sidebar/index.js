import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Utils from '../../utils/common';
import { ICON_URL, authToken } from '../../utils/constants';
import * as Actions from '../../containers/Login/actions';
import './sidebar.scss';

function Sidebar({ show, logout }) {
    return (
        <nav className={classNames('side-drawer', { open: show })}>
            <div className="userProfile">
                <span className="edit">Edit</span>
                <span className="profileIcon">
                    <img src={`${ICON_URL}User_avatar.svg`} alt="profile" />
                </span>
                <span className="profileName">SMEosa Admin</span>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <span className="icon">
                            <img src={`${ICON_URL}Preferences.svg`} alt="" />
                        </span>
                        <span className="text"> Preferences </span>
                    </li>
                    <li>
                        <span className="icon">
                            <img src={`${ICON_URL}Notification.svg`} alt="" />
                        </span>
                        <span className="text"> Notification </span>
                    </li>
                    <li>
                        <span className="icon">
                            <img src={`${ICON_URL}Contact _us.svg`} alt="" />
                        </span>
                        <span className="text">Contact Us</span>
                    </li>
                    <li>
                        <span className="icon">
                            <img src={`${ICON_URL}Rate_on_play_store.svg`} alt="" />
                        </span>
                        <span className="text">Rate on Play Store </span>
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
                    {!Utils.isUndefinedOrNullOrEmpty(authToken) && (
                        <li>
                            <span className="icon">
                                <img src={`${ICON_URL}LOgOut.svg`} alt="" />
                            </span>
                            <span
                                className="text"
                                onClick={() => {
                                    logout();
                                }}
                                role="button"
                                tabIndex={0}
                            >
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
};

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    null,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(Sidebar);
