import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserProfile from '../../icons/iconOfbCircleUser';
import PhoneIcon from '../../icons/iconOfbPhone';
import LogoutIcon from '../../icons/IconLogout';
import './sidebar.scss';

function Sidebar({ show }) {
    return (
        <nav className={classNames('side-drawer', { open: show })}>
            <div className="userProfile">
                <span className="edit">Edit</span>
                <span className="profileIcon">
                    <UserProfile color="#25d1c5" size={45} />
                </span>
                <span className="profileName">Bateshwar Mishra</span>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <PhoneIcon color="#25d1c5" size={25} />
                        <span> Preferences </span>
                    </li>
                    <li>
                        <PhoneIcon color="#25d1c5" size={25} />
                        <span> Notification </span>
                    </li>
                    <li>
                        <PhoneIcon color="#25d1c5" size={25} />
                        <span>Contact Us</span>
                    </li>
                    <li>
                        <PhoneIcon color="#25d1c5" size={25} />
                        <span>Rate on Play Store </span>
                    </li>
                    <li>
                        <PhoneIcon color="#25d1c5" size={25} />
                        <span>Share App with Friends </span>
                    </li>
                    <li>
                        <LogoutIcon color="#25d1c5" size={25} />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
};

export default Sidebar;
