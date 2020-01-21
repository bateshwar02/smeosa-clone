// import React, { memo, useRef, useState } from 'react';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import t from 'tcomb-form';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import ClassNames from 'classnames';
import Utils from '../../utils/common';
import smeForm from '../../components/form';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
// import login from './component/login';
import './index.scss';

export function Login({ otpForm, pageInfo }) {
    const loginForm = useRef(null);

    useInjectReducer({ key: 'login', reducer });
    useInjectSaga({ key: 'login', saga });

    const onChange = () => {};

    const getComponent = () => (
        <div className="contentWrapper">
            <t.form.Form ref={loginForm} type={getFormSchema()} value={otpForm} options={getFormOptions()} onChange={onChange} />
            <div className="text">
                {' '}
                By signing in, you agree with our <span className="textHighLight">Terms of Use</span> and <span className="textHighLight">Privacy Policy</span>{' '}
            </div>
        </div>
    );

    const getFormSchema = () => t.struct({ mobile: smeForm.refinements.mobile, otp: smeForm.refinements.validOtp });
    const getFormOptions = () => ({
        template: getLoginFormTemplate,
        fields: {
            mobile: {
                label: 'Mobile Number',
                template: smeForm.templates.textbox,
                error: val => {
                    if (Utils.isUndefinedOrNullOrEmpty(val)) {
                        return 'Mobile number is required';
                    }
                    return 'Invalid mobile number ';
                },
                config: {
                    addonBefore: '+91',
                },
                attrs: {
                    validateRegex: /^(\d{1}){0,10}$/,
                    autoComplete: 'new-number',
                },
                type: Utils.isMSite(pageInfo) ? 'number' : false,
            },
        },
    });

    const getLoginFormTemplate = locals => <div className="input-with-action">{locals.inputs.mobile}</div>;

    return <div className="loginWrapper">{getComponent()}</div>;
}

Login.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    pageInfo: PropTypes.object.isRequired,
    otpForm: PropTypes.object.isRequired,
    // isOtpSent: PropTypes.bool.isRequired,
    // otpInProgress: PropTypes.bool.isRequired,
    // inProgress: PropTypes.bool.isRequired,
    // sendOtp: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    login: makeSelectLogin(),
    // pageInfo: makeSelectPageInfo(),
    // inProgress: makeSelectInProgress(),
    // isSubmitted: makeSelectIsSubmitted(),
    // isOtpSent: makeSelectIsOtpSent(),
    // otpInProgress: makeSelectOtpInProgress(),
    // otpForm: makeSelectOtpForm(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(Login);
