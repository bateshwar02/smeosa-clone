/* eslint-disable react/jsx-props-no-spreading */
import classnames from 'classnames';
import Select, { components } from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';
import React from 'react';
import t from 'tcomb-form';
import renderFormGroup from './renderFormGroup';
import Breakpoints from './BreakPoints';
import getError from './getError';
import getLabel from './getLabel';
import getHelp from './getHelp';
import Utils from '../../utils/common';
import IconDropDownArrow from '../../icons/IconDropdownArrow';

const SelectboxConfig = t.struct(
    {
        addonBefore: t.Any,
        addonAfter: t.Any,
        horizontal: t.maybe(Breakpoints),
        buttonBefore: t.Any,
        buttonAfter: t.Any,
    },
    'SelectboxConfig',
);

const getStyles = {
    control: () => ({
        alignItems: 'center',
        background: 'none',
        border: '1px solid #A8B7C7',
        borderRadius: '2px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        minHeight: '36px',
        outline: '0',
        position: 'relative',
        transition: 'all 100ms',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    placeholder: () => ({
        color: 'rgba(22, 50, 92, 0.4)',
    }),
    valueContainer: () => ({
        alignItems: 'center',
        display: 'flex',
        flex: '1',
        flexWrap: 'wrap',
        padding: '2px 12px',
        position: 'relative',
        overflow: 'hidden',
    }),
    menu: () => ({
        backgroundColor: 'hsl(0, 0%, 100%)',
        border: '1px solid #D8DDE6',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,0.20)',
        boxSizing: 'border-box',
        position: 'absolute',
        top: '100%',
        width: '100%',
        zIndex: 1,
    }),
    option: provided => ({
        ...provided,
        backgroundColor: 'transparent',
        borderBottom: '1px solid #D8DDE6',
        ':hover': { backgroundColor: '#f4f6fc' },
        ':active': { backgroundColor: '#f4f6fc' },
        transition: 'all 200ms',
    }),
};

const DropdownIndicator = props =>
    components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
            <IconDropDownArrow size={12} color="#16325C" />
        </components.DropdownIndicator>
    );

function create(overrides = {}) {
    function select(obj) {
        const locals = obj;
        locals.config = select.getConfig(locals);

        const children = locals.config.horizontal ? select.renderHorizontal(locals) : select.renderVertical(locals);

        return select.renderFormGroup(children, locals);
    }

    select.getConfig =
        overrides.getConfig ||
        function getConfig(locals) {
            return new SelectboxConfig(locals.config || {});
        };

    select.renderStatic =
        overrides.renderStatic ||
        function renderStatic(locals) {
            return <p className="form-control-static select-static">{locals.value}</p>;
        };

    select.renderSelectbox =
        overrides.renderSelectbox ||
        function renderSelectbox(obj) {
            const locals = obj;
            if (locals.attrs.type === 'static') {
                return select.renderStatic(locals);
            }
            delete locals.attrs.attrs;
            const localsObj = {};
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.valueKey)) {
                localsObj.valueKey = locals.attrs.valueKey;
            } else {
                localsObj.valueKey = 'value';
            }
            const options = locals.options.filter(option => !Utils.isUndefinedOrNullOrEmpty(option[localsObj.valueKey]));
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.disabled)) {
                localsObj.disabled = locals.attrs.disabled;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.multiSelect)) {
                localsObj.isMulti = true;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.valueKey)) {
                localsObj.valueKey = locals.attrs.valueKey;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.labelKey)) {
                localsObj.labelKey = locals.attrs.labelKey;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.autofocus)) {
                localsObj.autofocus = true;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.onInputKeyDown) && Utils.isFunction(locals.attrs.onInputKeyDown)) {
                localsObj.onInputKeyDown = locals.attrs.onInputKeyDown;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.onKeyDown) && Utils.isFunction(locals.attrs.onKeyDown)) {
                localsObj.onKeyDown = locals.attrs.onKeyDown;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.clearable)) {
                localsObj.clearable = locals.attrs.clearable;
            } else {
                localsObj.clearable = true;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.onItemClick) && Utils.isFunction(locals.attrs.onItemClick)) {
                localsObj.onValueClick = locals.attrs.onItemClick;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.className)) {
                localsObj.className = locals.attrs.className;
            }
            if (locals.attrs.formatOptionLabel) {
                localsObj.formatOptionLabel = locals.attrs.formatOptionLabel;
            }
            if (locals.attrs.getOptionLabel) {
                localsObj.getOptionLabel = locals.attrs.getOptionLabel;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.loadOptions) && Utils.isFunction(locals.attrs.loadOptions)) {
                localsObj.loadOptions = locals.attrs.loadOptions;
            } else if (Utils.isUndefinedOrNullOrEmpty(options)) {
                throw new Error('Invalid Call');
            } else {
                localsObj.options = options;
            }
            // This flag is to be used when we want to show default options passed
            // in options attribute when
            // component is mounted but still not has been populated with options
            // using loadOptions
            if (locals.attrs.reloadOptions) {
                localsObj.options = options;
            }
            localsObj.instanceId = locals.attrs.name;
            localsObj.simpleValue = true;
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.simpleValue)) {
                localsObj.simpleValue = locals.attrs.simpleValue;
            }
            localsObj.name = locals.attrs.name;
            localsObj.disabled = locals.attrs.disabled;
            localsObj.value = locals.value;
            localsObj.onChange = value => {
                locals.onChange(value);
                if (Utils.isFunction(locals.attrs.reRender)) {
                    locals.attrs.reRender(value);
                }
            };
            localsObj.searchable = true;
            localsObj.placeholder = locals.attrs.placeholder || 'Select...';
            if (!locals.attrs.cache) {
                localsObj.cache = locals.attrs.cache;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.noResultsText)) {
                localsObj.noResultsText = locals.attrs.noResultsText;
            }

            let Component = Select;
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.loadOptions) && Utils.isFunction(locals.attrs.loadOptions)) {
                if (locals.attrs.creatable) {
                    Component = AsyncCreatableSelect;
                } else {
                    Component = AsyncSelect;
                }
            } else if (locals.attrs.creatable) {
                Component = CreatableSelect;
            }

            localsObj.styles = getStyles;
            return (
                <div className="reactSelectContainer">
                    <Component ref={locals.name} components={{ DropdownIndicator }} {...localsObj} />
                </div>
            );
        };

    select.renderLabel =
        overrides.renderLabel ||
        function renderLabel(locals) {
            return getLabel({
                label: locals.label,
                htmlFor: locals.attrs.id,
                breakpoints: locals.config.horizontal,
            });
        };

    select.renderError =
        overrides.renderError ||
        function renderError(locals) {
            return getError(locals);
        };

    select.renderHelp =
        overrides.renderHelp ||
        function renderHelp(locals) {
            return getHelp(locals);
        };

    select.renderVertical =
        overrides.renderVertical ||
        function renderVertical(locals) {
            return [select.renderLabel(locals), select.renderSelectbox(locals), select.renderError(locals), select.renderHelp(locals)];
        };

    select.renderHorizontal =
        overrides.renderHorizontal ||
        function renderHorizontal(locals) {
            const label = select.renderLabel(locals);
            const className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
            return [
                label,
                <div className={classnames(className)}>
                    {select.renderSelectbox(locals)}
                    {select.renderError(locals)}
                    {select.renderHelp(locals)}
                </div>,
            ];
        };

    select.renderFormGroup = overrides.renderFormGroup || renderFormGroup;

    select.clone = function clone(newOverrides = {}) {
        return create({ ...overrides, ...newOverrides });
    };

    return select;
}

export default create();
