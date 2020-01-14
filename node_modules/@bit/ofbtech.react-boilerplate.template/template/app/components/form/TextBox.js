/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classnames from 'classnames';
import t from 'tcomb-form';
import renderFormGroup from './renderFormGroup';
import Breakpoints from './BreakPoints';
import getLabel from './getLabel';
import getError from './getError';
import getHelp from './getHelp';
import Utils from '../../utils/common';

const TextboxConfig = t.struct(
    {
        addonBefore: t.Any,
        addonAfter: t.Any,
        horizontal: t.maybe(Breakpoints),
        buttonBefore: t.Any,
        buttonAfter: t.Any,
        capitalize: t.Any,
    },
    'TextboxConfig',
);

function getInputGroupButton(button) {
    return button;
}

function getInputGroup(children, locals) {
    let className = 'input-group';
    if (locals.disabled) {
        className += ' disabled';
    }
    return React.createElement.apply(null, ['div', { className }].concat(children));
}

function getAddon(addon) {
    return <span className="input-group-addon">{addon}</span>;
}

function onChange(locals, reRender, attrs) {
    if (locals.type === 'file') {
        return evt => {
            locals.onChange(evt.target.files[0]);
            if (Utils.isFunction(reRender)) {
                reRender(evt.target.files[0]);
            }
        };
    }

    if (locals.type === 'number' && attrs.showCounter) {
        return (evt, type) => {
            let { value } = evt.target;
            const localsValue = parseInt(locals.value, 10);
            const { counterCallback } = locals.attrs;
            if (type === 'INC') {
                value = Number.isNaN(localsValue) ? 1 : localsValue + 1;
            } else if (type === 'DEC') {
                value = Number.isNaN(localsValue) ? -1 : localsValue - 1;
            }
            locals.onChange(value);
            if (Utils.isFunction(reRender)) {
                reRender(value);
            }
            if (!Utils.isUndefinedOrNullOrEmpty(type) && Utils.isFunction(counterCallback)) {
                setTimeout(() => {
                    counterCallback(value);
                }, 1);
            }
        };
    }

    if (attrs.validateRegex) {
        const regex = new RegExp(attrs.validateRegex);
        return evt => {
            let val = evt.target.value;
            if (!regex.test(val)) {
                return;
            }

            if (locals.config.capitalize) {
                val = val.toUpperCase();
            }
            locals.onChange(val);
            if (Utils.isFunction(reRender)) {
                reRender(val);
            }
        };
    }

    return evt => {
        let val = evt.target.value;
        if (locals.config.capitalize) {
            val = val.toUpperCase();
        }
        locals.onChange(val);
        if (Utils.isFunction(reRender)) {
            reRender(val);
        }
    };
}

function create(overrides = {}) {
    function textbox(obj) {
        const locals = obj;
        locals.config = textbox.getConfig(locals);
        locals.attrs = textbox.getAttrs(locals);

        if (locals.type === 'hidden') {
            return textbox.renderHiddenTextbox(locals);
        }

        const children = locals.config.horizontal ? textbox.renderHorizontal(locals) : textbox.renderVertical(locals);
        return textbox.renderFormGroup(children, locals);
    }

    textbox.getConfig =
        overrides.getConfig ||
        function getConfig(locals) {
            return new TextboxConfig(locals.config || {});
        };

    textbox.getAttrs =
        overrides.getAttrs ||
        function getAttrs(obj) {
            const locals = obj;
            const { reRender } = locals.attrs;
            delete locals.attrs.reRender;
            const attrs = t.mixin({}, locals.attrs);
            attrs.type = locals.type;
            attrs.className = classnames(attrs.className);
            attrs.className += `${attrs.className ? ' ' : ''}form-control`;
            attrs.disabled = locals.disabled;
            if (locals.type !== 'file') {
                attrs.value = locals.value;
            }
            attrs.onChange = onChange(locals, reRender, attrs);

            if (locals.help) {
                attrs['aria-describedby'] = attrs['aria-describedby'] || `${attrs.id}-tip`;
            }
            return attrs;
        };

    textbox.renderHiddenTextbox =
        overrides.renderHiddenTextbox ||
        function renderHiddenTextbox(locals) {
            return <input type="hidden" value={locals.value} name={locals.attrs.name} />;
        };

    textbox.renderStatic =
        overrides.renderStatic ||
        function renderStatic(locals) {
            return <p className="form-control-static">{locals.value}</p>;
        };

    textbox.renderTextbox =
        overrides.renderTextbox ||
        function renderTextbox(locals) {
            if (locals.type === 'static') {
                return textbox.renderStatic(locals);
            }
            return locals.type !== 'textarea' ? textbox.renderInputGroup(locals) : textbox.renderTextarea(locals);
        };

    textbox.renderInputGroup =
        overrides.renderInputGroup ||
        function renderInputGroup(locals) {
            return getInputGroup(
                [
                    locals.config.buttonBefore ? getInputGroupButton(locals.config.buttonBefore) : null,
                    locals.config.addonBefore ? getAddon(locals.config.addonBefore) : null,
                    textbox.renderInput(locals),
                    locals.config.addonAfter ? getAddon(locals.config.addonAfter) : null,
                    locals.config.buttonAfter ? getInputGroupButton(locals.config.buttonAfter) : null,
                ],
                locals,
            );
        };

    textbox.renderInput =
        overrides.renderInput ||
        function renderInput(locals) {
            const attrs = t.mixin({}, locals.attrs);
            delete attrs.formGroupClassName;
            delete attrs.validateRegex;
            delete attrs.counterCallback;
            if (attrs.type === 'number' && attrs.showCounter) {
                delete attrs.showCounter;
                return (
                    <div className="inputWithCounter">
                        <input {...attrs} />
                        <div className="actionWrapper">
                            <button
                                type="button"
                                className="counter"
                                onClick={ev => {
                                    attrs.onChange(ev, 'DEC');
                                }}
                            >
                                <i className="material-icons">remove</i>
                            </button>
                            <button
                                type="button"
                                className="counter"
                                onClick={ev => {
                                    attrs.onChange(ev, 'INC');
                                }}
                            >
                                <i className="material-icons">add</i>
                            </button>
                        </div>
                    </div>
                );
            }
            return <input {...attrs} />;
        };

    textbox.renderTextarea =
        overrides.renderTextarea ||
        function renderTextarea(locals) {
            const attrs = t.mixin({}, locals.attrs);
            delete attrs.isFormSubmit;
            return <textarea {...attrs} />;
        };

    textbox.renderLabel =
        overrides.renderLabel ||
        function renderLabel(locals) {
            return getLabel({
                label: locals.label,
                htmlFor: locals.attrs.id,
                breakpoints: locals.config.horizontal,
            });
        };

    textbox.renderError =
        overrides.renderError ||
        function renderError(locals) {
            return getError(locals);
        };

    textbox.renderHelp =
        overrides.renderHelp ||
        function renderHelp(locals) {
            return getHelp(locals);
        };

    textbox.renderVertical =
        overrides.renderVertical ||
        function renderVertical(locals) {
            return [textbox.renderLabel(locals), textbox.renderTextbox(locals), textbox.renderError(locals), textbox.renderHelp(locals)];
        };

    textbox.renderHorizontal =
        overrides.renderHorizontal ||
        function renderHorizontal(locals) {
            const label = textbox.renderLabel(locals);
            const className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
            return [
                label,
                <div className={classnames(className)}>
                    11
                    {textbox.renderTextbox(locals)}
                    {textbox.renderError(locals)}
                    {textbox.renderHelp(locals)}
                </div>,
            ];
        };

    textbox.renderFormGroup = overrides.renderFormGroup || renderFormGroup;

    textbox.clone = function clone(newOverrides = {}) {
        return create({ ...overrides, ...newOverrides });
    };

    return textbox;
}

export default create();
