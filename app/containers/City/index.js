import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
import t from 'tcomb-form';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import smeForm from '../../components/form';
import Utils from '../../utils/common';

// import makeSelectCity from './selectors';
import reducer from './reducer';
import saga from './saga';
import './index.scss';

export function City({ cityData, getCategoryBrandDataByRegion }) {
    const regionForm = useRef(null);
    const [cityFormValue, setFormValue] = useState({});
    const [cityOptionData, setPopularCityOption] = useState(cityData);

    useInjectReducer({ key: 'city', reducer });
    useInjectSaga({ key: 'city', saga });

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
        if (!Utils.isUndefinedOrNullOrEmptyList(customData.popularCity)) getCategoryBrandDataByRegion(formValue.popularCity[0]);
        if (!Utils.isUndefinedOrNullOrEmptyList(customData.otherCity)) getCategoryBrandDataByRegion(formValue.otherCity[0]);
        setFormValue(formValue);
    };

    const cityOption = () => {
        const customData = {};
        cityOptionData.data.forEach(item => {
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
    cityData: PropTypes.object.isRequired,
    getCategoryBrandDataByRegion: PropTypes.func.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//     city: makeSelectCity(),
// });

// function mapDispatchToProps(dispatch) {
//     return {
//         dispatch,
//     };
// }

// const withConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps,
// );

// export default compose(withConnect)(City);

export default City;
