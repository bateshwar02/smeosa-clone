import { createSelector } from 'reselect';

const selectPageInfo = state => state.pageInfo || {};

const selectLoginDetails = state => state.loginDetails || {};

const selectCommon = state => state.common || {};

const makeSelectPageInfo = () =>
    createSelector(
        selectPageInfo,
        pageInfo => pageInfo,
    );

const makeSelectOrgList = () =>
    createSelector(
        selectLoginDetails,
        ({ minOrganisationsList }) => minOrganisationsList,
    );

const makeSelectIsLoggedIn = () =>
    createSelector(
        selectLoginDetails,
        ({ isLoggedIn }) => isLoggedIn,
    );

const makeSelectAccountDetails = () =>
    createSelector(
        selectLoginDetails,
        ({ minAccountDto }) => minAccountDto,
    );

const makeSelectUnseenNotificationCount = () =>
    createSelector(
        selectLoginDetails,
        ({ unseenNotificationCount }) => unseenNotificationCount,
    );

const makeSelectDomain = () =>
    createSelector(
        selectPageInfo,
        ({ domain }) => domain,
    );

const makeSelectIsFullPageDetail = () =>
    createSelector(
        selectCommon,
        ({ isFullPageDetail }) => isFullPageDetail,
    );

const makeSelectOrganisationDetail = () =>
    createSelector(
        selectCommon,
        ({ organisationDetail }) => organisationDetail,
    );

const makeSelectRoleDetail = () =>
    createSelector(
        selectCommon,
        ({ roleDetail }) => roleDetail,
    );

const makeSelectAllPermissions = () =>
    createSelector(
        selectCommon,
        ({ allPermissions }) => allPermissions,
    );

export {
    selectLoginDetails,
    selectPageInfo,
    makeSelectPageInfo,
    makeSelectOrgList,
    makeSelectIsLoggedIn,
    makeSelectAccountDetails,
    makeSelectUnseenNotificationCount,
    makeSelectDomain,
    makeSelectIsFullPageDetail,
    makeSelectOrganisationDetail,
    makeSelectRoleDetail,
    makeSelectAllPermissions,
};
