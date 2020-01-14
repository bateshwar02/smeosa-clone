/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import t from 'tcomb-form';
import classnames from 'classnames';
import renderFormGroup from './renderFormGroup';
import Breakpoints from './BreakPoints';
import getLabel from './getLabel';
import getError from './getError';
import getHelp from './getHelp';
import Utils from '../../utils/common';

const RadioConfig = t.struct(
    {
        horizontal: t.maybe(Breakpoints),
    },
    'RadioConfig',
);

function getRadio(obj, text, key) {
    const attrs = obj;
    const radioGroupClasses = {
        disabled: attrs.disabled,
        checked: attrs.checked,
    };
    delete attrs.radioClass;
    return (
        <div key={key} className={`radioItem ${classnames(radioGroupClasses)}`}>
            <label className="radioLabel" htmlFor={attrs.id}>
                <input {...attrs} />
                <span>{text}</span>
            </label>
        </div>
    );
}

function create(overrides = {}) {
    function radio(obj) {
        const locals = obj;
        locals.config = radio.getConfig(locals);

        const children = locals.config.horizontal ? radio.renderHorizontal(locals) : radio.renderVertical(locals);

        return radio.renderFormGroup(children, locals);
    }

    radio.getConfig =
        overrides.getConfig ||
        function getConfig(locals) {
            return new RadioConfig(locals.config || {});
        };

    radio.renderRadios =
        overrides.renderRadios ||
        function renderRadios(obj) {
            const locals = obj;
            const { id } = locals.attrs;
            const { reRender } = locals.attrs;
            delete locals.attrs.reRender;
            const onChange = evt => {
                locals.onChange(evt.target.value);
                if (Utils.isFunction(reRender)) {
                    reRender(evt.target.value);
                }
            };
            return locals.options.map((option, i) => {
                const radioView = locals.attrs.horizontalView;
                const attrs = t.mixin({}, locals.attrs);
                delete attrs.horizontalView;
                delete attrs.isFormSubmit;
                attrs.type = 'radio';
                attrs.checked = option.value === locals.value;
                attrs.disabled = locals.disabled;
                attrs.value = option.value;
                attrs.autoFocus = attrs.autoFocus && i === 0;
                attrs.id = `${id}_${i}`;
                attrs['aria-describedby'] = attrs['aria-describedby'] || (locals.label ? id : null);
                attrs.onChange = onChange;
                return getRadio(attrs, option.text, option.value, radioView);
            });
        };

    radio.renderLabel =
        overrides.renderLabel ||
        function renderLabel(locals) {
            if (locals.attrs.horizontalView) {
                return (
                    <div>
                        {getLabel({
                            label: locals.label,
                            htmlFor: locals.attrs.id,
                            breakpoints: locals.config.horizontal,
                        })}
                    </div>
                );
            }
            return getLabel({
                label: locals.label,
                htmlFor: locals.attrs.id,
                breakpoints: locals.config.horizontal,
            });
        };

    radio.renderError =
        overrides.renderError ||
        function renderError(locals) {
            return getError(locals);
        };

    radio.renderHelp =
        overrides.renderHelp ||
        function renderHelp(locals) {
            return getHelp(locals);
        };

    radio.renderVertical =
        overrides.renderVertical ||
        function renderVertical(locals) {
            return [radio.renderLabel(locals), radio.renderRadios(locals), radio.renderError(locals), radio.renderHelp(locals)];
        };

    radio.renderHorizontal =
        overrides.renderHorizontal ||
        function renderHorizontal(locals) {
            const label = radio.renderLabel(locals);
            const className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
            return [
                label,
                <div className={classnames(className)}>
                    {radio.renderRadios(locals)}
                    {radio.renderError(locals)}
                    {radio.renderHelp(locals)}
                </div>,
            ];
        };

    radio.renderFormGroup = overrides.renderFormGroup || renderFormGroup;

    radio.clone = function clone(newOverrides = {}) {
        return create({ ...overrides, ...newOverrides });
    };

    return radio;
}

export default create();
