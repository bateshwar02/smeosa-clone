/**
 *
 * TodoItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import CheckBox from '../CheckBox/Loadable';

function TodoItem({ data, changeStatus }) {
    const handleChange = checked => changeStatus(data.id, checked);
    const className = `todo-item ui-state-default ${data.completed === true ? 'completed' : 'pending'}`;

    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox checked={data.completed} onChange={handleChange} /> {data.title}
                </label>
            </div>
        </li>
    );
}

TodoItem.propTypes = {
    data: PropTypes.object,
    changeStatus: PropTypes.func,
};

TodoItem.defaultProps = {
    data: {},
    changeStatus: () => {},
};

export default memo(TodoItem);
