/**
 *
 * ToDo
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import TodoItem from './components/TodoItem/Loadable';
import * as Actions from './actions';
import { FILTER_COMPLETED, FILTER_ACTIVE } from './constants';
import ToDoSearch from './components/TodoSearch/Loadable';
import ToDoFilter from './components/TodoFilter/Loadable';
import makeSelectToDos, { makeSelectFilter, makeSelectSearchQuery } from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { makeSelectPageInfo } from '../App/selectors';

export function ToDo({ todos, filter, changeStatus, changeFilter, searchQuery, setSearchQuery, addToDo }) {
    useInjectReducer({ key: 'toDo', reducer });
    useInjectSaga({ key: 'toDo', saga });

    const getFilteredToDos = () => {
        const filteredToDos = todos.filter(item => !searchQuery || item.title.indexOf(searchQuery.trim()) !== -1);
        switch (filter) {
            case FILTER_COMPLETED:
                return filteredToDos.filter(item => item.completed === true);

            case FILTER_ACTIVE:
                return filteredToDos.filter(item => item.completed !== true);

            default:
                return filteredToDos;
        }
    };

    return (
        <div className="todolist">
            <Helmet>
                <title>ToDo</title>
                <meta name="description" content="Description of ToDo" />
            </Helmet>
            <header>
                <h1>Things To Do</h1>
                <ToDoSearch query={searchQuery} setSearchQuery={setSearchQuery} addToDo={addToDo} />
            </header>
            <ToDoFilter filter={filter} changeFilter={changeFilter} />
            <ul className="list-unstyled">
                {getFilteredToDos().map(item => (
                    <TodoItem key={item.id} data={item} changeStatus={changeStatus} />
                ))}
            </ul>
        </div>
    );
}

ToDo.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeStatus: PropTypes.func.isRequired,
    changeFilter: PropTypes.func.isRequired,
    filter: PropTypes.string,
    searchQuery: PropTypes.string,
    setSearchQuery: PropTypes.func.isRequired,
    addToDo: PropTypes.func.isRequired,
};

ToDo.defaultProps = {
    filter: null,
    searchQuery: '',
};

const mapStateToProps = createStructuredSelector({
    todos: makeSelectToDos(),
    filter: makeSelectFilter(),
    searchQuery: makeSelectSearchQuery(),
    pageInfo: makeSelectPageInfo(),
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(ToDo);
