import React, { memo, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import t from 'tcomb-form';
import PropTypes from 'prop-types';
import smeForm from '../form';
import Utils from '../../utils/common';
import { ICON_URL } from '../../utils/constants';
import * as Actions from '../../containers/Home/actions';
import Loader from '../Loader/Loadable';
import './index.scss';

function Search({ homePage, setIsSearch, setSearchData }) {
    const searchForm = useRef(null);
    const [formData, setFormValue] = useState({});
    const [isActiveOption, setIsActiveOption] = useState(false);
    const [suggestionsOption, setSuggestions] = useState([]);
    const [isProgress, setIsProgress] = useState(false);

    const { brandCategoryData } = homePage;

    const onChange = formValue => {
        const options = [];
        let activeOption = false;
        if (!Utils.isUndefinedOrNull(formValue.searchData) && Utils.isUndefinedOrNullOrEmpty(formValue.searchValue)) {
            if (formValue.searchData.length > 0) {
                const suggestions = [];
                const input = formValue.searchData;
                if (!Utils.isUndefinedOrNullOrEmptyList(brandCategoryData) && !Utils.isUndefinedOrNullOrEmptyList(brandCategoryData.smeosaBrandsDtoList)) {
                    const clientData = brandCategoryData.smeosaBrandsDtoList
                        .filter(item => item.brandName.toUpperCase().includes(input.toUpperCase()))
                        .map(r => ({
                            customKey: `smeosaBrandsDtoList-${r.brandId}`,
                            name: r.brandName,
                        }));
                    suggestions.push(...clientData);
                }
                if (
                    !Utils.isUndefinedOrNullOrEmptyList(brandCategoryData) &&
                    !Utils.isUndefinedOrNullOrEmptyList(brandCategoryData.smeosaProductCategoryDtoList)
                ) {
                    const clientData = brandCategoryData.smeosaProductCategoryDtoList
                        .filter(item => item.productCategoryName.toUpperCase().includes(input.toUpperCase()))
                        .map(r => ({
                            customKey: `smeosaProductCategoryDtoList-${r.productCategoryId}`,
                            name: r.productCategoryName,
                        }));
                    suggestions.push(...clientData);
                }
                const option = suggestions.map(item => ({ value: item.customKey, text: item.name }));
                options.push(...option);
                activeOption = true;
                setIsActiveOption(activeOption);
                setSuggestions(options);
                setFormValue(formValue);
                return;
            }
        }
        if (!Utils.isUndefinedOrNullOrEmpty(formValue.searchValue)) {
            setIsProgress(true);
            setSearchData(homePage, formValue.searchValue[0], setIsSearch);
        }
        setIsActiveOption(activeOption);
        setSuggestions(options);
        setFormValue(formValue);
    };

    const getFormSchema = () => t.struct({ searchData: t.String, searchValue: t.String });
    const getNoDataFound = () => (
        <div className="nodataFound">
            <span className="image">
                <img src={`${ICON_URL}No Resulr Found_button.svg`} alt="no data found" />
            </span>
            <span className="noDataHeader">Sorry, no results found!</span>
            <span className="text">Please check the spelling or try searching for something else</span>
        </div>
    );
    const getLoginFormTemplate = locals => (
        <>
            <div className="SearchWrapper">
                <div className="selectOption">{locals.inputs.searchData}</div>
                {isActiveOption && Utils.isUndefinedOrNullOrEmptyList(suggestionsOption) && getNoDataFound()}
                {isActiveOption && <div className="SearchOption">{locals.inputs.searchValue}</div>}
            </div>
        </>
    );

    const getFormOptions = () => ({
        template: getLoginFormTemplate,
        fields: {
            searchData: {
                template: smeForm.templates.textbox,
                attrs: {
                    placeholder: 'Search for category or brand',
                },
            },
            searchValue: {
                template: smeForm.templates.checkbox,
                nullOption: false,
                options: suggestionsOption,
                factory: t.form.Radio,
            },
        },
    });

    return (
        <section className="pageWrapper searchWrapper">
            <div className="fixedWrapper">
                <div className="searchHeadWrapper">
                    <div className="header-icon" role="button" tabIndex={0}>
                        <i className="material-icons">search</i>
                    </div>
                    <div className="header">
                        <t.form.Form ref={searchForm} type={getFormSchema()} value={formData} options={getFormOptions()} onChange={onChange} />
                    </div>
                    <div className="quit" onClick={() => setIsSearch(false)} role="button" tabIndex={0}>
                        <span>
                            <i className="material-icons">clear</i>
                        </span>
                    </div>
                </div>
                {isProgress && <Loader />}
            </div>
        </section>
    );
}

Search.propTypes = {
    homePage: PropTypes.object.isRequired,
    setIsSearch: PropTypes.func.isRequired,
    setSearchData: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
const withConnect = connect(
    null,
    mapDispatchToProps,
);
export default compose(
    withConnect,
    memo,
)(Search);
