/**
 *
 * Loader
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import './index.scss';

function Loader() {
    // return (
    //     <div className="frame">
    //         <div className="center">
    //             <div className="dot-1"></div>
    //             <div className="dot-2"></div>
    //             <div className="dot-3"></div>
    //         </div>
    //     </div>
    // );

    // return (
    //     <div className="spinner-box">
    //         <div className="circle-border">
    //             <div className="circle-core"></div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="showbox" disabled>
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
                </svg>
            </div>
        </div>
    );
}

Loader.propTypes = {};

export default memo(Loader);
