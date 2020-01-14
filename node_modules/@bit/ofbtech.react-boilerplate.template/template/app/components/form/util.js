import t from 'tcomb-form';
import _ from 'lodash';
import React from 'react';
// import MiscellaneousService from '../../../services/miscellaneous';
import OfbForm from '.';
import Utils from '../../utils/common';
import { COMMON } from '../../utils/constants';

export default class Util {
    static textbox(field, value, readonly) {
        const self = this;
        return {
            template: OfbForm.templates.textbox,
            label: self.getLabel(field),
            attrs: {
                placeholder: field.placeholder,
                disabled: readonly,
            },
            error: self.getErrors(field),
            disabled: readonly,
        };
    }

    static textarea(field, value, readonly) {
        const self = this;
        return {
            template: OfbForm.templates.textbox,
            label: self.getLabel(field),
            attrs: {
                placeholder: field.placeholder,
                disabled: readonly,
            },
            type: 'textarea',
            error: self.getErrors(field),
            disabled: readonly,
        };
    }

    static richTextarea(field, value, readonly) {
        const self = this;
        return {
            template: OfbForm.templates.textbox,
            label: self.getLabel(field),
            attrs: {
                placeholder: field.placeholder,
                disabled: readonly,
            },
            type: 'richtext',
            error: self.getErrors(field),
            disabled: readonly,
        };
    }

    static checkbox(field, value, readonly) {
        const self = this;
        return {
            label: self.getLabel(field),
            attrs: {
                placeholder: field.placeholder,
                disabled: readonly,
            },
            error: self.getErrors(field),
            disabled: readonly,
        };
    }

    static datepicker(field, value, readonly) {
        const self = this;
        let validator = null;
        if (!Utils.isUndefinedOrNullOrEmptyObject(field.properties)) {
            const { startDate } = field.properties;
            const { endDate } = field.properties;
            validator = now => {
                // min date constraint
                if (!Utils.isUndefinedOrNull(startDate) && Number(now) < Number(startDate)) {
                    return false;
                }

                // max date constraint
                if (!Utils.isUndefinedOrNull(endDate) && Number(endDate) < Number(now)) {
                    return false;
                }

                return true;
            };
        }

        let timeConstraints = null;
        if (!Utils.isUndefinedOrNullOrEmptyObject(field.properties)) {
            const { startDate } = field.properties;
            const { endDate } = field.properties;
            timeConstraints = {
                milliseconds: {},
            };

            if (!Utils.isUndefinedOrNull(startDate)) {
                timeConstraints.milliseconds.min = Number(startDate);
            }

            if (!Utils.isUndefinedOrNull(endDate)) {
                timeConstraints.milliseconds.max = Number(endDate);
            }
        }
        return {
            template: OfbForm.templates.date,
            label: self.getLabel(field),
            transformer: OfbForm.transformers.dateTransformer,
            attrs: {
                placeholder: field.placeholder,
                timeFormat: false,
                dateFormat: 'DD/M/YYYY',
                input: true,
                isValidDate: validator,
                timeConstraints,
                disabled: readonly,
            },
            error: self.getErrors(field),
            disabled: readonly,
        };
    }

    static multicheckbox(field, value, readonly) {
        const self = this;
        return {
            template: OfbForm.templates.checkbox,
            label: self.getLabel(field),
            options: field.properties.options.map(option => ({ value: option.value, text: option.label })),
            factory: t.form.Radio,
            attrs: {
                placeholder: field.placeholder,
                disabled: readonly,
            },
            error: self.getErrors(field),
            disabled: readonly,
        };
    }

    static radiogroup(field, value, readonly) {
        const self = this;
        return {
            template: OfbForm.templates.radio,
            label: self.getLabel(field),
            options: field.properties.options.map(option => ({ value: option.value, text: option.label })),
            factory: t.form.Radio,
            attrs: {
                placeholder: field.placeholder,
                disabled: readonly,
            },
            error: self.getErrors(field),
            disabled: readonly,
        };
    }

    static selectmenu(field, value, readonly) {
        const self = this;
        const schema = {
            label: self.getLabel(field),
            template: OfbForm.templates.select,
            options: field.properties.options,
            factory: t.form.Select,
            attrs: {
                placeholder: field.placeholder,
                disabled: readonly,
            },
            error: self.getErrors(field),
            disabled: readonly,
        };
        if (field.properties.multiple === true) {
            schema.attrs.multiselect = true;
            schema.transformer = OfbForm.transformers.listTransformer;
        }
        return schema;
    }

    static scale(field, value, readonly) {
        const self = this;
        return {
            template: OfbForm.templates.scale,
            label: self.getLabel(field),
            options: field.properties.options.map(option => ({
                value: option.value,
                text: option.label,
            })),
            factory: t.form.Radio,
            attrs: {
                placeholder: field.placeholder,
                disabled: readonly,
            },
            error: self.getErrors(field),
            disabled: readonly,
        };
    }

    static majorClientsItemTemplate(locals) {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-6">{locals.inputs.clientName}</div>
                    <div className="col-xs-6">{locals.inputs.clientContribution}</div>
                </div>
            </div>
        );
    }

    static majorClientsTemplate(locals) {
        return (
            <div className="observationTableEdit">
                <div className="row m-b-5">
                    <div className="col-xs-6 columnTitle">
                        <strong>Name</strong>
                    </div>
                    <div className="col-xs-6 columnTitle">
                        <strong>Contribution</strong>
                    </div>
                </div>
                {locals.items.map((item, index) => (
                    <div key={`major_clients_input_${index + 1}`} className="inputFields">
                        <div className="inputPan">{item.input}</div>
                    </div>
                ))}
                <div className="text-right m-b-20">
                    <button type="button" className="btn btn-info" onClick={locals.add.click}>
                        {locals.add.label}
                    </button>
                </div>
            </div>
        );
    }

    static turnoverDetailsItemTemplate(locals) {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-6">{locals.inputs.financialYear}</div>
                    <div className="col-xs-6">{locals.inputs.turnover}</div>
                </div>
            </div>
        );
    }

    static turnoverDetailsTemplate(locals) {
        return (
            <div className="observationTableEdit">
                <div className="row m-b-5">
                    <div className="col-xs-6 columnTitle">
                        <strong>Financial Year</strong>
                    </div>
                    <div className="col-xs-6 columnTitle">
                        <strong>Turnover (in lacs)</strong>
                    </div>
                </div>
                {locals.items.map((item, index) => (
                    <div key={`turnover_details_input_${index + 1}`} className="inputFields">
                        <div className="inputPan">{item.input}</div>
                    </div>
                ))}
                <div className="text-right m-b-20">
                    <button type="button" className="btn btn-info" onClick={locals.add.click}>
                        {locals.add.label}
                    </button>
                </div>
            </div>
        );
    }

    static majorSuppliersItemTemplate(locals) {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-6">{locals.inputs.supplierName}</div>
                </div>
            </div>
        );
    }

    static majorSuppliersTemplate(locals) {
        return (
            <div className="observationTableEdit">
                <div className="row m-b-5">
                    <div className="col-xs-6 columnTitle">
                        <strong>Supplier Name</strong>
                    </div>
                </div>
                {locals.items.map((item, index) => (
                    <div key={`major_suppliers_input_${index + 1}`} className="inputFields">
                        <div className="inputPan">{item.input}</div>
                    </div>
                ))}
                <div className="text-right m-b-20">
                    <button type="button" className="btn btn-info" onClick={locals.add.click}>
                        {locals.add.label}
                    </button>
                </div>
            </div>
        );
    }

    static majorRawMaterialsItemTemplate(locals) {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-4">{locals.inputs.material}</div>
                    <div className="col-xs-4">{locals.inputs.quantity}</div>
                    <div className="col-xs-4">{locals.inputs.units}</div>
                </div>
            </div>
        );
    }

    static manufacturedProductItemTemplate(locals) {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-4">{locals.inputs.product}</div>
                    <div className="col-xs-4">{locals.inputs.endIndustry}</div>
                    <div className="col-xs-4">{locals.inputs.manufacturingCycle}</div>
                </div>
            </div>
        );
    }

    static majorRawMaterialsTemplate(locals) {
        return (
            <div className="observationTableEdit">
                <div className="row m-b-5">
                    <div className="col-xs-4 columnTitle">
                        <strong>Raw Material</strong>
                    </div>
                    <div className="col-xs-4 columnTitle">
                        <strong>Quantity</strong>
                    </div>
                    <div className="col-xs-4 columnTitle">
                        <strong>Units</strong>
                    </div>
                </div>
                {locals.items.map((item, index) => (
                    <div key={`major_raw_materials_input_${index + 1}`}>{item.input}</div>
                ))}
                <div className="text-right m-b-20">
                    <button type="button" className="btn btn-info" onClick={locals.add.click}>
                        {locals.add.label}
                    </button>
                </div>
            </div>
        );
    }

    static manufacturedProductTemplate(locals) {
        return (
            <div className="observationTableEdit">
                <div className="row m-b-5">
                    <div className="col-xs-4 columnTitle">
                        <strong>Product</strong>
                    </div>
                    <div className="col-xs-4 columnTitle">
                        <strong>End Industry</strong>
                    </div>
                    <div className="col-xs-4 columnTitle">
                        <strong>Manufacturing Cycle</strong>
                    </div>
                </div>
                {locals.items.map((item, index) => (
                    <div key={`manufactured_product_${index + 1}`}>{item.input}</div>
                ))}
                <div className="text-right m-b-20">
                    <button type="button" className="btn btn-info" onClick={locals.add.click}>
                        {locals.add.label}
                    </button>
                </div>
            </div>
        );
    }

    static customwidget(field, value, fieldOptions, readonly) {
        const self = this;
        const { widgetName } = field.properties;
        let template;
        let item;
        let attrs;
        let factory;
        let options;
        switch (widgetName) {
            case 'BANK_NAME_AUTOCOMPLETE':
                template = OfbForm.templates.select;
                options = [];
                // For autocompelete initialize the options with the filled value
                if (!Utils.isUndefinedOrNullOrEmpty(value)) {
                    if (value instanceof Array) {
                        options = [{ value: value[0], label: value[0] }];
                    }
                }
                factory = t.form.Select;
                attrs = {
                    disabled: readonly,
                    reloadOptions: true,
                    cache: false,
                    placeholder: field.placeholder,
                    clearable: false,
                    loadOptions: (input, callback) => {
                        if (!Utils.isStringAndNotEmpty(input)) {
                            callback(options);
                            // return;
                        }
                    },
                };
                break;
            case 'BANK_ACCOUNT_AUTOCOMPLETE':
                template = OfbForm.templates.select;
                options = fieldOptions.BANK_ACCOUNT_AUTOCOMPLETE || [];
                factory = t.form.Select;
                attrs = {
                    disabled: readonly,
                    reloadOptions: true,
                    cache: false,
                    placeholder: field.placeholder,
                    clearable: false,
                };
                break;
            case 'major_clients':
                template = Util.majorClientsTemplate;
                item = {
                    template: this.majorClientsItemTemplate,
                    fields: {
                        clientName: {
                            template: OfbForm.templates.textbox,
                            label: 'Client Name',
                            attrs: {
                                placeholder: 'Name',
                            },
                        },
                        clientContribution: {
                            template: OfbForm.templates.textbox,
                            label: 'Contribution',
                            attrs: {
                                placeholder: '(in percent)',
                            },
                            error: 'Please enter a valid percentage',
                        },
                    },
                };
                attrs = {
                    disabled: readonly,
                    reloadOptions: true,
                    cache: false,
                    placeholder: field.placeholder,
                    clearable: false,
                };
                break;
            case 'turnover_details':
                template = Util.turnoverDetailsTemplate;
                item = {
                    template: this.turnoverDetailsItemTemplate,
                    fields: {
                        financialYear: {
                            template: OfbForm.templates.select,
                            label: 'Financial Year',
                            factory: t.form.Select,
                            options: field.properties.widgetProperties.financialYears,
                            attrs: {
                                placeholder: 'Year',
                            },
                        },
                        turnover: {
                            template: OfbForm.templates.textbox,
                            label: 'Turnover',
                            attrs: {
                                placeholder: '(in lacs)',
                            },
                            error: 'Please enter a valid amount',
                        },
                    },
                };
                attrs = {
                    disabled: readonly,
                    reloadOptions: true,
                    cache: false,
                    placeholder: field.placeholder,
                    clearable: false,
                };
                break;
            case 'major_suppliers':
                template = Util.majorSuppliersTemplate;
                item = {
                    template: this.majorSuppliersItemTemplate,
                    fields: {
                        supplierName: {
                            template: OfbForm.templates.textbox,
                            label: 'Supplier Name',
                            attrs: {
                                placeholder: 'Name',
                            },
                        },
                    },
                };
                attrs = {
                    disabled: readonly,
                    reloadOptions: true,
                    cache: false,
                    placeholder: field.placeholder,
                    clearable: false,
                };
                break;
            case 'major_raw_materials_and_quantum_of_purchases':
                template = Util.majorRawMaterialsTemplate;
                item = {
                    template: this.majorRawMaterialsItemTemplate,
                    fields: {
                        material: {
                            template: OfbForm.templates.textbox,
                            label: 'Raw Material',
                        },
                        quantity: {
                            template: OfbForm.templates.textbox,
                            label: 'Quantity',
                            error: 'Please enter a valid quantity',
                        },
                        units: {
                            template: OfbForm.templates.textbox,
                            label: 'Units',
                        },
                    },
                };
                attrs = {
                    disabled: readonly,
                    reloadOptions: true,
                    cache: false,
                    placeholder: field.placeholder,
                    clearable: false,
                };
                break;
            case 'manufactured_products':
                template = Util.manufacturedProductTemplate;
                item = {
                    template: this.manufacturedProductItemTemplate,
                    fields: {
                        product: {
                            template: OfbForm.templates.textbox,
                            label: 'Product',
                        },
                        endIndustry: {
                            template: OfbForm.templates.textbox,
                            label: 'End Industry',
                            error: 'Please enter a valid quantity',
                        },
                        manufacturingCycle: {
                            template: OfbForm.templates.textbox,
                            label: 'Manufacturing Cycle',
                        },
                    },
                };
                attrs = {
                    disabled: readonly,
                    reloadOptions: true,
                    cache: false,
                    placeholder: field.placeholder,
                    clearable: false,
                };
                break;
            default:
                break;
        }
        return {
            label: self.getLabel(field),
            template,
            item,
            options,
            attrs,
            factory,
            error: self.getErrors(field),
        };
    }

    static getLabel(field) {
        if (field.required) {
            return `${field.label} *`;
        }

        return field.label;
    }

    static getErrors(field) {
        return value => {
            const errors = field.errors || {};
            const { properties } = field;

            // richText
            if (field.type === COMMON.FIELD_TYPE.RICH_TEXT && field.required && Utils.isRichTextEmpty(value)) {
                let message = 'Required field';
                if (!Utils.isUndefinedOrNullOrEmpty(field.errors)) {
                    message = errors[COMMON.ERROR_TYPE.REQUIRED] || message;
                }
                return message;
            }

            // required
            if (field.required && Utils.isUndefinedOrNullOrEmpty(value)) {
                let message = 'Required field';
                if (!Utils.isUndefinedOrNullOrEmpty(field.errors)) {
                    message = errors[COMMON.ERROR_TYPE.REQUIRED] || message;
                }
                return message;
            }

            if (!properties) {
                return null;
            }

            // patter
            let message = 'Validation failed';
            if (!Utils.isUndefinedOrNullOrEmpty(field.properties.pattern)) {
                const regex = new RegExp(properties.pattern, 'i');
                if (!regex.test(value)) {
                    if (!Utils.isUndefinedOrNullOrEmpty(field.errors)) {
                        message = field.errors[COMMON.ERROR_TYPE.PATTERN] || message;
                    }
                    return message;
                }
            }

            // minlength
            if (!Utils.isUndefinedOrNullOrEmpty(field.properties.minLength)) {
                const minLength = Number(field.properties.minLength);
                if (value.length < +minLength) {
                    if (!Utils.isUndefinedOrNullOrEmpty(field.errors)) {
                        message = field.errors[COMMON.ERROR_TYPE.MIN_LENGTH] || `${message} Reason: Cannot be less than ${minLength}`;
                    }
                    return message;
                }
            }

            // maxlength
            if (!Utils.isUndefinedOrNullOrEmpty(field.properties.maxLength)) {
                const maxLength = Number(field.properties.maxLength);
                if (value.length > +maxLength) {
                    if (!Utils.isUndefinedOrNullOrEmpty(field.errors)) {
                        message = field.errors[COMMON.ERROR_TYPE.MAX_LENGTH] || `${message} Reason: Cannot be greater than ${maxLength}`;
                    }
                    return message;
                }
            }

            // No error messages defined
            return null;
        };
    }

    static compareAnswer(field, value1, value2) {
        const self = this;
        if (Utils.isUndefinedOrNullOrEmpty(value1) && Utils.isUndefinedOrNullOrEmpty(value2)) {
            return null;
        }

        const refValue = (value1 && value1.filter(v => v)) || [];
        const targetValue = (value2 && value2.filter(v => v)) || [];

        if (Utils.isUndefinedOrNullOrEmptyList(refValue) && Utils.isUndefinedOrNullOrEmptyList(targetValue)) {
            return null;
        }

        switch (field.type) {
            case COMMON.FIELD_TYPE.TEXT_BOX:
            case COMMON.FIELD_TYPE.TEXT_AREA:
            case COMMON.FIELD_TYPE.RICH_TEXT:
            case COMMON.FIELD_TYPE.CHECKBOX:
            case COMMON.FIELD_TYPE.RADIO_GROUP:
            case COMMON.FIELD_TYPE.SELECT_MENU:
            case COMMON.FIELD_TYPE.MULTI_CHECKBOX:
            case COMMON.FIELD_TYPE.DATE_RANGE:
            case COMMON.FIELD_TYPE.DATE_PICKER:
            case COMMON.FIELD_TYPE.SCALE:
            case COMMON.FIELD_TYPE.CUSTOM_WIDGET:
                return _.isEqual(self.sanatizeValue(refValue), self.sanatizeValue(targetValue));
            default:
                return false;
        }
    }

    static sanatizeValue(value) {
        if (!value || !(value instanceof Array)) {
            return null;
        }

        return value
            .map(v => {
                if (!v) {
                    return null;
                }
                if (typeof v === 'string') {
                    return v
                        .trim()
                        .replace(/\s+/g, ' ')
                        .toLowerCase();
                }
                return v;
            })
            .sort();
    }
}
