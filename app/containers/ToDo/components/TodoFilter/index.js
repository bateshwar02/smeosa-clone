/**
 *
 * ToDo - Filter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { TODO_FILTERS } from '../../constants';

export default function ToDoFilter({ filter, changeFilter }) {
    const getClass = key => (key === filter ? 'selected' : '');

    return (
        <ul className="filters list-unstyled clearfix">
            {Object.keys(TODO_FILTERS).map(key => (
                <li key={key}>
                    <button type="button" onClick={() => changeFilter(key)} className={getClass(key)}>
                        {TODO_FILTERS[key]}
                    </button>
                </li>
            ))}
        </ul>
    );
}

ToDoFilter.propTypes = {
    changeFilter: PropTypes.func,
    filter: PropTypes.string,
};

ToDoFilter.defaultProps = {
    changeFilter: () => {},
    filter: null,
};
