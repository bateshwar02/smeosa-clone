/*
 *
 * ToDo actions
 *
 */

import { CHANGE_STATUS, CHANGE_FILTER, UPDATE_TODO, SET_SEARCH_QUERY, ADD_TODO } from './constants';

export function changeStatus(id, checked) {
    return {
        type: CHANGE_STATUS,
        id,
        checked,
    };
}

export function changeFilter(filter) {
    return {
        type: CHANGE_FILTER,
        filter,
    };
}

export function updateToDo(todos) {
    return {
        type: UPDATE_TODO,
        todos,
    };
}

export function setSearchQuery(query) {
    return {
        type: SET_SEARCH_QUERY,
        query,
    };
}

export function addToDo(todo) {
    return {
        type: ADD_TODO,
        todo,
    };
}
