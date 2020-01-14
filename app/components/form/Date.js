/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import t from 'tcomb-form';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import renderFormGroup from './renderFormGroup';
import Breakpoints from './BreakPoints';
import getLabel from './getLabel';
import getError from './getError';
import getHelp from './getHelp';
import Utils from '../../utils/common';
import IconCalender from '../../icons/IconCalender';
import './date.scss';

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

function create(overrides = {}) {
    function date(locals) {
        const newLocal = locals;
        newLocal.config = date.getConfig(newLocal);

        const children = newLocal.config.horizontal ? date.renderHorizontal(newLocal) : date.renderVertical(newLocal);

        return date.renderFormGroup(children, newLocal);
    }

    date.getConfig =
        overrides.getConfig ||
        function getConfig(locals) {
            return new SelectboxConfig(locals.config || {});
        };

    date.renderDatebox =
        overrides.renderDatebox ||
        function renderDatebox(dateLocal) {
            const locals = dateLocal;
            const { reRender } = locals.attrs;
            delete locals.attrs.reRender;
            const newLocals = {
                onChange: val => {
                    locals.onChange(val);
                    if (Utils.isFunction(reRender)) {
                        reRender(val);
                    }
                },
                selected: locals.value,
            };
            newLocals.closeOnSelect = true;
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.dateFormat)) {
                newLocals.dateFormat = locals.attrs.dateFormat;
            }
            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.timeFormat)) {
                newLocals.timeFormat = locals.attrs.timeFormat;
            }

            if (!Utils.isUndefinedOrNullOrEmpty(locals.attrs.placeholder)) {
                newLocals.placeholderText = locals.attrs.placeholder;
            }
            if (!Utils.isUndefinedOrNull(locals.attrs.isValidDate) && Utils.isFunction(locals.attrs.isValidDate)) {
                newLocals.filterDate = locals.attrs.isValidDate;
            }
            if (Utils.isString(newLocals.value)) {
                newLocals.selected = parseInt(newLocals.value, 10);
            }

            if (Utils.isUndefinedOrNullOrEmpty(newLocals.dropdownMode)) {
                newLocals.dropdownMode = 'select';
            }

            if (Utils.isUndefinedOrNullOrEmpty(newLocals.showMonthDropdown)) {
                newLocals.showMonthDropdown = true;
            }

            if (Utils.isUndefinedOrNullOrEmpty(newLocals.showYearDropdown)) {
                newLocals.showYearDropdown = true;
            }

            return (
                <div className="input-group date-input-group">
                    <DatePicker {...newLocals} />
                    <span className="inputIcon">
                        <IconCalender size={20} color="#A8B7C7" />
                    </span>
                </div>
            );
        };

    date.renderLabel =
        overrides.renderLabel ||
        function renderLabel(locals) {
            return getLabel({
                label: locals.label,
                htmlFor: locals.attrs.id,
                breakpoints: locals.config.horizontal,
            });
        };

    date.renderError =
        overrides.renderError ||
        function renderError(locals) {
            return getError(locals);
        };

    date.renderHelp =
        overrides.renderHelp ||
        function renderHelp(locals) {
            return getHelp(locals);
        };

    date.renderVertical =
        overrides.renderVertical ||
        function renderVertical(locals) {
            return [date.renderLabel(locals), date.renderDatebox(locals), date.renderError(locals), date.renderHelp(locals)];
        };

    date.renderHorizontal =
        overrides.renderHorizontal ||
        function renderHorizontal(locals) {
            const label = date.renderLabel(locals);
            const className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
            return [
                label,
                <div className={classnames(className)}>
                    {date.renderDatebox(locals)}
                    {date.renderError(locals)}
                    {date.renderHelp(locals)}
                </div>,
            ];
        };

    date.renderFormGroup = overrides.renderFormGroup || renderFormGroup;

    date.clone = function clone(newOverrides = {}) {
        return create({ ...overrides, ...newOverrides });
    };

    return date;
}

export default create();
