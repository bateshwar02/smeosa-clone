import cookie from 'cookies-js';
import Request from '../../utils/request';

const Service = {
    getOtp(formData) {
        const url = `/api/v1/account/loginOtp`;
        return Request.post(url, formData);
    },
    verifyOtp(formData) {
        const url = `/api/v1/account/create`;
        return Request.post(url, formData);
    },
    submitProfile(formData) {
        const url = `/api/v1/organisation/create`;
        return Request.post(url, formData);
    },
    getUserDetails() {
        const url = '/api/v1/account/detail';
        return Request.get(url);
    },
    setCredential(ofbToken, organisationId) {
        if (ofbToken) {
            cookie.set('auth-token', ofbToken, { expires: Infinity });
        }
        if (organisationId) {
            cookie.set('organisationId', organisationId, { expires: Infinity });
        }
    },
    logout() {
        return Service.clearCredentials('auth-token', 'organisationId');
    },
    clearCredentials(key, organisationKey) {
        cookie.expire(key);
        cookie.expire(organisationKey);
    },
};
export default Service;
