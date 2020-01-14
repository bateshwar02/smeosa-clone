import React from 'react';
import moment from 'moment';
import t from 'tcomb-form';
import classnames from 'classnames';
import renderFormGroup from './renderFormGroup';
import Breakpoints from './BreakPoints';
import getLabel from './getLabel';
import getError from './getError';
import getHelp from './getHelp';
import Utils from '../../utils/common';

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
    const date = locals => {
        const newLocals = locals;
        newLocals.config = date.getConfig(newLocals);

        const children = newLocals.config.horizontal ? date.renderHorizontal(newLocals) : date.renderVertical(newLocals);

        return date.renderFormGroup(children, newLocals);
    };

    date.getConfig =
        overrides.getConfig ||
        function getConfig(locals) {
            return new SelectboxConfig(locals.config || {});
        };

    date.renderDateRangebox =
        overrides.renderDatebox ||
        function renderDatebox(locals) {
            const newLocals = {};
            // const value = {};
            // let display = locals.attrs.placeholder || '';
            if (!Utils.isUndefinedOrNullOrEmptyObject(locals.value)) {
                newLocals.startDate = moment(locals.value.startDate);
                newLocals.endDate = moment(locals.value.endDate);
                // if (!Utils.isUndefinedOrNullOrEmpty(locals.value.startDate) && !Utils.isUndefinedOrNullOrEmpty(locals.value.endDate)) {
                //     display = `${moment(locals.value.startDate).format('DD MMM YYYY')} - ${moment(locals.value.endDate).format('DD MMM YYYY')}`;
                // }
            }
            newLocals.onApply = (ev, picker) => {
                const value = {
                    startDate: picker.startDate.valueOf(),
                    endDate: picker.endDate.valueOf(),
                };
                locals.onChange(value);
            };
            newLocals.onCancel = () => {
                const value = {
                    startDate: null,
                    endDate: null,
                };
                locals.onChange(value);
            };
            newLocals.ranges = {
                Today: [moment(), moment()],
                Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [
                    moment()
                        .subtract(1, 'month')
                        .startOf('month'),
                    moment()
                        .subtract(1, 'month')
                        .endOf('month'),
                ],
            };
            return null;

            // return (
            //     <DateRangePicker {..._locals}>
            //         <button className="btn btn-block btn-default date-picker-btn">
            //             <span className="material-icons m-r-10">date_range</span>
            //             <span>{display}</span>
            //         </button>
            //     </DateRangePicker>
            // )
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
            return [date.renderLabel(locals), date.renderDateRangebox(locals), date.renderError(locals), date.renderHelp(locals)];
        };

    date.renderHorizontal =
        overrides.renderHorizontal ||
        function renderHorizontal(locals) {
            const label = date.renderLabel(locals);
            const className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
            return [
                label,
                <div className={classnames(className)}>
                    {date.renderDateRangebox(locals)}
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
