import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import smeForm from '../../../components/form';
import Utils from '../../../utils/common';
import { STEPS } from '../constants';
import Loader from '../../../components/Loader/Loadable';

export function Login({ getOtp, submitOtp, step, isOtpSent, isProgress }) {
    const loginForm = useRef(null);
    const [mobileForm, setMobileForm] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showOtp, setShowOtp] = useState(false);

    const onChange = formValue => {
        if (!Utils.isUndefinedOrNullOrEmptyObject(formValue.mobile) && Utils.isUndefinedOrNullOrEmptyObject(formValue.otp)) {
            loginForm.current.validate();
            const { errors } = loginForm.current.validate();
            if (Utils.isEmptyList(errors)) {
                sendOtp(formValue);
                setMobileForm(formValue);
                return;
            }
        }
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
        setIsSubmitted(true);
        const { errors } = loginForm.current.validate();
        if (!Utils.isEmptyList(errors)) {
            return;
        }
        const otpFormData = Utils.deepCopy(mobileForm);
        otpFormData.profiles = {
            SMEOSAUSER: {
                type: 'smeosauser',
            },
        };
        otpFormData.businessEntities = ['SMEOSA'];
        submitOtp(otpFormData);
    };

    const getComponent = () => (
        <div className="contentWrapper">
            <t.form.Form ref={loginForm} type={getFormSchema()} value={mobileForm} options={getFormOptions()} onChange={onChange} />
            {step === STEPS.LOGIN && (
                <div className="text">
                    {' '}
                    By signing in, you agree with our <span className="textHighLight">Terms of Use</span> and{' '}
                    <span className="textHighLight">Privacy Policy</span>{' '}
                </div>
            )}
            {step === STEPS.VERIFY && (
                <div className="otpText">
                    {' '}
                    Auto-verifying the OTP sent on +91 xxxxxxx
                    {!Utils.isUndefinedOrNullOrEmptyObject(mobileForm.mobile) && mobileForm.mobile.substring(mobileForm.mobile.length - 3)}{' '}
                </div>
            )}
        </div>
    );

    const formSchema = { mobile: smeForm.refinements.mobile };
    if (step === 1) {
        formSchema.otp = smeForm.refinements.validOtp;
    }

    const getFormSchema = () => t.struct(formSchema);
    const getFormOptions = () => ({
        template: getLoginFormTemplate,
        fields: {
            mobile: {
                label: 'Mobile Number',
                template: smeForm.templates.textbox,
                disabled: STEPS.LOGIN,
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

    const getShowOtpBtn = () => {
        if (!isOtpSent) {
            return null;
        }
        return (
            <button
                type="button"
                onClick={() => {
                    setShowOtp(!showOtp);
                }}
                className="btn resendOtp"
            >
                Resend Otp
            </button>
        );
    };

    const getLoginFormTemplate = locals => (
        <>
            <div className="input-with-action">{locals.inputs.mobile}</div>
            <div className="input-with-action">{locals.inputs.otp}</div>
        </>
    );

    return (
        <div className="loginWrapper">
            {getComponent()}
            {(step === 1 || isOtpSent) && (
                <div className="getOtpWrapper" onClick={submit} role="button" tabIndex={0}>
                    <span className="sendOtp"> get OTP </span>
                </div>
            )}
            {isProgress && <Loader />}
        </div>
    );
}

Login.propTypes = {
    getOtp: PropTypes.func.isRequired,
    submitOtp: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    isOtpSent: PropTypes.bool.isRequired,
    isProgress: PropTypes.bool.isRequired,
};
export default Login;
