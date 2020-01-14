/**
 *
 * Todo - Search
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
// import styled from 'styled-components';

import OfbForm from '../../../../components/form';

function TodoSearch({ setSearchQuery, query, addToDo }) {
    const todoSearchForm = useRef(null);

    const [state, setState] = useState({
        formValue: {
            query,
        },
    });

    const onChange = ({ query: newQuery }) => {
        const { formValue } = state;
        setState({
            formValue: {
                ...formValue,
                query: newQuery,
            },
        });
        setSearchQuery(newQuery);
    };

    const generateFormSchema = () => {
        const schema = {
            query: t.String,
        };

        return t.struct(schema);
    };

    const generateFormOption = () => ({
        template: generateFormLayout,
        fields: {
            query: {
                label: 'Search / Add New',
                template: OfbForm.templates.textbox,
                attrs: {
                    placeholder: 'Type to search or Press enter to add new',
                    onKeyUp: e => {
                        if (e.keyCode === 13) {
                            addToDo(e.target.value);
                        }
                    },
                },
            },
        },
    });

    const generateFormLayout = locals => (
        <>
            <div className="row">
                <div className="col s12 m12">{locals.inputs.query}</div>
            </div>
        </>
    );

    return (
        // <input
        //     type="text"
        //     className="form-control search"
        //     placeholder="Type to search or Press enter to add new"
        //     onKeyUp={e => {
        //         if (e.keyCode === 13) {
        //             addToDo(e.target.value);
        //         }
        //     }}
        //     onChange={e => setSearchQuery(e.target.value)}
        //     value={query}
        // />
        <t.form.Form ref={todoSearchForm} type={generateFormSchema()} options={generateFormOption()} value={state.formValue} onChange={onChange} />
    );
}

TodoSearch.propTypes = {
    query: PropTypes.string,
    setSearchQuery: PropTypes.func,
    addToDo: PropTypes.func,
};

TodoSearch.defaultProps = {
    query: '',
    setSearchQuery: () => {},
    addToDo: () => {},
};

export default memo(TodoSearch);
