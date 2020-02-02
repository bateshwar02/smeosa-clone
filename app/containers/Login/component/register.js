import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import smeForm from '../../../components/form';
import Utils from '../../../utils/common';
import Loader from '../../../components/Loader/Loadable';

export function Register({ submitProfile, profile, setLogin, isProgress }) {
    const loginForm = useRef(null);
    const [profileForm, setOtpForm] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onChange = formValue => {
        if (isSubmitted) {
            loginForm.current.validate();
        }
        setOtpForm(formValue);
    };

    const submit = () => {
        setIsSubmitted(true);
        const { errors } = loginForm.current.validate();
        if (!Utils.isEmptyList(errors)) {
            return;
        }
        const profileData = Utils.deepCopy(profileForm);
        profileData.accountId = getOrderId();
        profileData.organisationName = profileForm.name;
        profileData.potential = 0;
        profileData.leadSource = 'SMEOSA';
        submitProfile(profileData);
        setLogin(false);
    };

    const getComponent = () => (
        <div className="contentWrapper">
            <t.form.Form ref={loginForm} type={getFormSchema()} value={profileForm} options={getFormOptions()} onChange={onChange} />
            <div className="text">
                {' '}
                By signing in, you agree with our <span className="textHighLight">Terms of Use</span> and <span className="textHighLight">Privacy Policy</span>{' '}
            </div>
        </div>
    );

    const getFormSchema = () => t.struct({ name: smeForm.refinements.name, email: smeForm.refinements.email });
    const getFormOptions = () => ({
        template: getLoginFormTemplate,
        fields: {
            name: {
                label: 'Name',
                template: smeForm.templates.textbox,
                attrs: {
                    placeholder: 'Enter Name',
                },
                error: val => {
                    if (Utils.isUndefinedOrNullOrEmpty(val)) {
                        return 'Name is required';
                    }
                    return 'Invalid Name';
                },
                type: 'Text',
            },
            email: {
                label: 'Email',
                template: smeForm.templates.textbox,
                attrs: {
                    placeholder: 'Enter Email Id',
                },
                error: val => {
                    if (Utils.isUndefinedOrNullOrEmpty(val)) {
                        return 'Email Id is required';
                    }
                    return 'Invalid Email Id';
                },
                type: 'email',
            },
        },
    });

    const getLoginFormTemplate = locals => (
        <>
            <div className="input-with-action">{locals.inputs.name}</div>
            <div className="input-with-action">{locals.inputs.email}</div>
        </>
    );

    const getOrderId = () => {
        let organisationId = '';
        if (!Utils.isUndefinedOrNullOrEmptyObject(profile.account)) {
            organisationId = profile.account.accountId;
        }
        return organisationId;
    };

    return (
        <div className="loginWrapper">
            {getComponent()}
            <div className="getOtpWrapper" onClick={submit} role="button" tabIndex={0}>
                <span className="sendOtp"> Submit </span>
            </div>
            {isProgress && <Loader />}
        </div>
    );
}

Register.propTypes = {
    submitProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    setLogin: PropTypes.func.isRequired,
    isProgress: PropTypes.bool.isRequired,
};
export default Register;
