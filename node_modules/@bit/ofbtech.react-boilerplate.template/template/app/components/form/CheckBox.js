import React from 'react';
import t from 'tcomb-form';
import classnames from 'classnames';
import renderFormGroup from './renderFormGroup';
import Breakpoints from './BreakPoints';
import getError from './getError';
import getLabel from './getLabel';
import getHelp from './getHelp';
import Utils from '../../utils/common';

const CheckboxConfig = t.struct(
    {
        horizontal: t.maybe(Breakpoints),
    },
    'CheckboxConfig',
);

function getCheckbox(attrs, text, key) {
    const checkboxGroupClasses = {
        disabled: attrs.disabled,
        checked: attrs.checked,
    };

    function handleChange() {
        attrs.onChange(attrs.value);
    }

    return (
        <div key={key} className={classnames(checkboxGroupClasses)}>
            <label htmlFor={key} className="checkboxLabel" disabled={attrs.disabled || false}>
                <input
                    id={key}
                    type="checkbox"
                    name={text}
                    checked={attrs.checked}
                    onChange={handleChange}
                    value={attrs.value}
                    disabled={attrs.disabled || false}
                />
                <span>{text}</span>
            </label>
        </div>
    );
}

function create(overrides = {}) {
    function checkbox(locals) {
        const newLocal = locals;
        newLocal.config = checkbox.getConfig(newLocal);

        const children = newLocal.config.horizontal ? checkbox.renderHorizontal(newLocal) : checkbox.renderVertical(newLocal);

        return checkbox.renderFormGroup(children, newLocal);
    }

    checkbox.getConfig =
        overrides.getConfig ||
        function getConfig(locals) {
            return new CheckboxConfig(locals.config || {});
        };

    checkbox.getAttrs =
        overrides.getAttrs ||
        function getAttrs(locals) {
            const newLocal = locals;
            const attrs = t.mixin({}, newLocal.attrs);
            const { reRender } = newLocal.attrs;
            delete newLocal.attrs.reRender;
            attrs.type = 'checkbox';
            attrs.disabled = newLocal.disabled;
            attrs.checked = newLocal.value;
            attrs.onChange = evt => {
                newLocal.onChange(evt.target.checked);
                if (Utils.isFunction(reRender)) {
                    reRender(evt.target.checked);
                }
            };
            if (newLocal.help) {
                attrs['aria-describedby'] = attrs['aria-describedby'] || `${attrs.id}-tip`;
            }
            return attrs;
        };

    checkbox.renderStatic =
        overrides.renderStatic ||
        function renderStatic(locals) {
            if (Utils.isUndefinedOrNullOrEmpty(locals.value)) {
                return null;
            }
            return (
                <p className="form-control-static-group">
                    {locals.value.map((item, i) => (
                        <span key={`${i + 1}-static-chackbox`} className="form-control-static">
                            {item}
                            <span>, </span>
                        </span>
                    ))}
                </p>
            );
        };

    checkbox.renderCheckbox =
        overrides.renderCheckbox ||
        function renderCheckbox(locals) {
            if (locals.type === 'static') {
                return checkbox.renderStatic(locals);
            }
            const { id } = locals.attrs;
            const onChange = _value => {
                const values = Object.assign([], locals.value);
                const pos = values.indexOf(_value);
                if (pos > -1) {
                    values.splice(pos, 1);
                } else {
                    values.push(_value);
                }
                locals.onChange(Utils.getUniqueList(values));
            };
            return (
                <div className="checkbox-group">
                    {locals.options.map((option, i) => {
                        const checkboxView = locals.attrs.horizontalView;
                        const attrs = t.mixin({}, locals.attrs);
                        const pos = Utils.isUndefinedOrNullOrEmpty(locals.value) ? -1 : locals.value.indexOf(option.value);
                        const key = `${locals.label.replace(/ /g, '_')}-checkbox-${i}`;
                        if (pos > -1) {
                            attrs.checked = true;
                        } else {
                            attrs.checked = false;
                        }
                        delete attrs.horizontalView;
                        delete attrs.isFormSubmit;
                        attrs.type = 'checkbox';
                        attrs.disabled = locals.disabled;
                        attrs.value = option.value;
                        attrs.autoFocus = attrs.autoFocus && i === 0;
                        attrs.id = `${id}_${i}`;
                        attrs['aria-describedby'] = attrs['aria-describedby'] || (locals.label ? id : null);
                        attrs.onChange = onChange;
                        return getCheckbox(attrs, option.text, key, checkboxView);
                    })}
                </div>
            );
        };

    checkbox.renderLabel =
        overrides.renderLabel ||
        function renderLabel(locals) {
            return getLabel({
                label: locals.label,
                htmlFor: locals.attrs.id,
                breakpoints: locals.config.horizontal,
            });
        };

    checkbox.renderError =
        overrides.renderError ||
        function renderError(locals) {
            return getError(locals);
        };

    checkbox.renderHelp =
        overrides.renderHelp ||
        function renderHelp(locals) {
            return getHelp(locals);
        };

    checkbox.renderVertical =
        overrides.renderVertical ||
        function renderVertical(locals) {
            return [checkbox.renderLabel(locals), checkbox.renderCheckbox(locals), checkbox.renderError(locals), checkbox.renderHelp(locals)];
        };

    checkbox.renderHorizontal =
        overrides.renderHorizontal ||
        function renderHorizontal(locals) {
            const label = checkbox.renderLabel(locals);
            const className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
            return [
                label,
                <div className={classnames(className)}>
                    {checkbox.renderCheckbox(locals)}
                    {checkbox.renderError(locals)}
                    {checkbox.renderHelp(locals)}
                </div>,
            ];
        };

    checkbox.renderFormGroup = overrides.renderFormGroup || renderFormGroup;

    checkbox.clone = function clone(newOverrides = {}) {
        return create({ ...overrides, ...newOverrides });
    };

    return checkbox;
}

export default create();
