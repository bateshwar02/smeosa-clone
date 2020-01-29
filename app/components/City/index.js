import React, { memo, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import Utils from '../../utils/common';
import smeForm from '../form';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSetStateDetails from '../../containers/Home/selectors';
import * as Actions from '../../containers/Home/actions';
import reducer from '../../containers/Home/reducer';
import saga from '../../containers/Home/saga';
import './index.scss';

export function City({ homeData, getDataByRegionId, getRegion, setStateDate }) {
    useInjectReducer({ key: 'homePage', reducer });
    useInjectSaga({ key: 'homePage', saga });

    const regionForm = useRef(null);
    const [cityFormValue, setFormValue] = useState({});
    const [cityOptionData, setPopularCityOption] = useState([]);
    const emptyRegionData = Utils.isUndefinedOrNullOrEmptyObject(cityOptionData);

    useEffect(() => {
        getRegion();
    }, [getRegion]);

    useEffect(() => {
        if (!Utils.isUndefinedOrNullOrEmptyList(homeData.regions)) {
            setPopularCityOption(homeData.regions);
        }
    }, [homeData.regions]);

    const onChange = formValue => {
        const customData = Utils.deepCopy(cityOptionData);
        const { data } = customData;
        if (!Utils.isUndefinedOrNull(formValue.search) && formValue.search.length > 2) {
            const input = formValue.search;
            const filterData = data.filter(item => item.regionName.toUpperCase().includes(input.toUpperCase()));
            customData.data = filterData;
            setPopularCityOption(customData);
            return;
        }
        if (!Utils.isUndefinedOrNullOrEmptyList(formValue.popularCity[0])) {
            getDataByRegionId(formValue.popularCity[0]);
            setStateDate(false);
        }
        if (!Utils.isUndefinedOrNullOrEmptyList(formValue.otherCity[0])) {
            getDataByRegionId(formValue.popularCity[0]);
            setStateDate(false);
        }
        setFormValue(formValue);
    };

    const cityOption = () => {
        const customData = {};
        if (emptyRegionData) {
            return customData;
        }
        cityOptionData.forEach(item => {
            if (!customData.popularCity) {
                customData.popularCity = [];
            }
            if (!customData.otherCity) {
                customData.otherCity = [];
            }
            if (item.isOfbOperative) {
                customData.popularCity.push({ text: item.regionName, value: item.regionId });
            } else {
                customData.otherCity.push({ text: item.regionName, value: item.regionId });
            }
        });
        return customData;
    };

    const getFormSchema = () => {
        const schema = {};
        schema.search = t.String;
        if (!Utils.isUndefinedOrNullOrEmptyList(cityOption().popularCity)) {
            schema.popularCity = t.String;
        }
        schema.search = t.String;
        if (!Utils.isUndefinedOrNullOrEmptyList(cityOption().otherCity)) {
            schema.otherCity = t.String;
        }
        return t.struct(schema);
    };

    const getFormOptions = () => ({
        template: cityFormTemplate,
        fields: {
            search: {
                label: '',
                template: smeForm.templates.textbox,
                attrs: {
                    placeholder: 'Search for location',
                },
                config: {
                    addonBefore: <i className="material-icons">search</i>,
                },
            },
            popularCity: {
                template: smeForm.templates.checkbox,
                nullOption: false,
                options: cityOption().popularCity,
                factory: t.form.Radio,
            },
            otherCity: {
                template: smeForm.templates.checkbox,
                nullOption: false,
                options: cityOption().otherCity,
                factory: t.form.Radio,
            },
        },
    });

    const cityFormTemplate = locals => (
        <>
            <div className="searchWrapper">
                <span className="searchFrom">{locals.inputs.search}</span>
            </div>
            <div className="cityContainer">
                <div className="popularCityWrapper">{locals.inputs.popularCity}</div>
                <div className="otherCityWrapper">{locals.inputs.otherCity}</div>
            </div>
        </>
    );
    return (
        <div className="cityWrapper">
            <t.form.Form ref={regionForm} type={getFormSchema()} value={cityFormValue} options={getFormOptions()} onChange={onChange} />
        </div>
    );
}

City.propTypes = {
    homeData: PropTypes.object.isRequired,
    getDataByRegionId: PropTypes.func.isRequired,
    getRegion: PropTypes.func.isRequired,
    setStateDate: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    homeData: makeSetStateDetails(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(City);
