/*
 *
 * ToDo reducer
 *
 */
import produce from 'immer';
import { UPDATE_TODO, CHANGE_FILTER, SET_SEARCH_QUERY } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const toDoReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case UPDATE_TODO: {
                draft.todos = action.todos;
                draft.searchQuery = '';
                break;
            }
            case CHANGE_FILTER: {
                draft.filter = action.filter;
                break;
            }
            case SET_SEARCH_QUERY: {
                draft.searchQuery = action.query;
                break;
            }
        }
    });

export default toDoReducer;
