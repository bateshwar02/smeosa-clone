import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Utils from '../../utils/common';
import { makeLoginSteps, makeSelectIsOtpSent, makeSelectProfile } from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import { STEPS } from './constants';
import LoginPage from './component/login';
import Register from './component/register';
import './index.scss';

export function Login({ step, sendOtp, isOtpSent, submitOtp, profile, submitProfile, setLogin, detailPageUrl, history }) {
    useInjectReducer({ key: 'login', reducer });
    useInjectSaga({ key: 'login', saga });

    if (step === STEPS.SUBMIT) {
        setLogin(false);
    }
    const [formData, setFormData] = useState({});
    const [isProgress, setIsProgress] = useState(false);
    const [isProgressRegister, setIsProgressRegister] = useState(false);

    const getOtp = formValue => {
        let form = Utils.deepCopy(formData);
        if (!Utils.isUndefinedOrNullOrEmptyObject(formValue)) {
            form = { ...formData };
            setFormData(form);
            setIsProgress(true);
            sendOtp(formValue, setIsProgress);
        }
    };

    const sendOtpToSubmit = data => {
        setIsProgress(true);
        submitOtp(data, setIsProgress, detailPageUrl, history);
    };

    const submitUserProfile = data => {
        setIsProgressRegister(true);
        submitProfile(data, setIsProgressRegister, detailPageUrl, history);
    };

    const getPageRender = () => {
        switch (step) {
            case STEPS.REGISTER:
                return <Register profile={profile} submitProfile={submitUserProfile} setLogin={setLogin} isProgress={isProgressRegister} />;
            default:
                return <LoginPage getOtp={getOtp} step={step} isOtpSent={isOtpSent} submitOtp={sendOtpToSubmit} isProgress={isProgress} />;
        }
    };

    return getPageRender();
}

Login.propTypes = {
    isOtpSent: PropTypes.bool.isRequired,
    sendOtp: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    submitOtp: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    submitProfile: PropTypes.func.isRequired,
    setLogin: PropTypes.func.isRequired,
    detailPageUrl: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
    step: makeLoginSteps(),
    isOtpSent: makeSelectIsOtpSent(),
    profile: makeSelectProfile(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(Login);
