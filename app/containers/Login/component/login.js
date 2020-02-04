import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import smeForm from '../../../components/form';
import Utils from '../../../utils/common';
import { STEPS } from '../constants';
import Loader from '../../../components/Loader/Loadable';

export function Login({ getOtp, submitOtp, step, isProgress }) {
    const loginForm = useRef(null);
    const [mobileForm, setMobileForm] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onChange = formValue => {
        if (isSubmitted) {
            loginForm.current.validate();
        }
        setMobileForm(formValue);
    };

    const sendOtp = formData => {
        const sendOtpObj = Utils.deepCopy(formData);
        sendOtpObj.businessEntity = 'SMEOSA';
        getOtp(sendOtpObj);
    };

    const submit = () => {
        const { errors } = loginForm.current.validate();
        if (!Utils.isEmptyList(errors)) {
            return;
        }
        setIsSubmitted(true);
        if (step === STEPS.VERIFY) {
            const otpFormData = Utils.deepCopy(mobileForm);
            otpFormData.profiles = {
                SMEOSAUSER: {
                    type: 'smeosauser',
                },
            };
            otpFormData.businessEntities = ['SMEOSA'];
            submitOtp(otpFormData);
            return;
        }
        const otpFormData = Utils.deepCopy(mobileForm);
        otpFormData.businessEntity = 'SMEOSA';
        getOtp(otpFormData);
    };

    const isOtpFieldShow = () => {
        if (step === STEPS.VERIFY && !Utils.isUndefinedOrNullOrEmpty(mobileForm.mobile) && mobileForm.mobile.length === 10) {
            return true;
        }
        return false;
    };

    const getComponent = () => (
        <div className="contentWrapper">
            <t.form.Form ref={loginForm} type={getFormSchema()} value={mobileForm} options={getFormOptions()} onChange={onChange} />
            {!isOtpFieldShow() && (
                <div className="text">
                    {' '}
                    By signing in, you agree with our <span className="textHighLight">Terms of Use</span> and{' '}
                    <span className="textHighLight">Privacy Policy</span>{' '}
                </div>
            )}
            {isOtpFieldShow() && (
                <div className="otpText">
                    {' '}
                    Auto-verifying the OTP sent on +91 xxxxxxx
                    {!Utils.isUndefinedOrNullOrEmptyObject(mobileForm.mobile) && mobileForm.mobile.substring(mobileForm.mobile.length - 3)}{' '}
                </div>
            )}
        </div>
    );

    const formSchema = { mobile: smeForm.refinements.mobile };
    if (step === STEPS.VERIFY && !Utils.isUndefinedOrNullOrEmptyObject(mobileForm.mobile) && mobileForm.mobile.length === 10) {
        formSchema.otp = smeForm.refinements.validOtp;
    }

    const getFormSchema = () => t.struct(formSchema);
    const getFormOptions = () => ({
        template: getLoginFormTemplate,
        fields: {
            mobile: {
                label: 'Mobile Number',
                template: smeForm.templates.textbox,
                disabled: isOtpFieldShow(),
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
                type: 'number',
            },
            otp: {
                label: 'OTP',
                template: smeForm.templates.textbox,
                attrs: {
                    placeholder: 'Enter OTP',
                    validateRegex: /^(\d{1}){0,6}$/,
                    autoComplete: 'new-password',
                },
                config: {
                    buttonAfter: getShowOtpBtn(),
                },
                error: val => {
                    if (Utils.isUndefinedOrNullOrEmpty(val)) {
                        return 'OTP is required';
                    }
                    return 'Invalid OTP';
                },
                type: 'password',
            },
        },
    });

    const getShowOtpBtn = () => (
        <button
            type="button"
            onClick={() => {
                sendOtp(mobileForm);
            }}
            className="btn resendOtp"
        >
            Resend Otp
        </button>
    );
    const getLoginFormTemplate = locals => (
        <>
            <div className="input-with-action">{locals.inputs.mobile}</div>
            <div className="input-with-action">{locals.inputs.otp}</div>
        </>
    );

    return (
        <div className="loginWrapper">
            {getComponent()}
            <div className="getOtpWrapper" onClick={submit} role="button" tabIndex={0}>
                <span className="sendOtp">{isOtpFieldShow() ? 'Submit OTP' : 'Get OTP'} </span>
            </div>
            {isProgress && <Loader />}
        </div>
    );
}

Login.propTypes = {
    getOtp: PropTypes.func.isRequired,
    submitOtp: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    isProgress: PropTypes.bool.isRequired,
};
export default Login;
