import { takeLatest, select, put } from 'redux-saga/effects';

import { notifyError } from '../App/action';
import { updateToDo as updateToDoAction } from './actions';
import { CHANGE_STATUS, ADD_TODO } from './constants';
import makeSelectToDos from './selectors';
import Utils from '../../utils/common';

// to update status for specifix todo
function* updateStatus({ id: todoId, checked }) {
    const todos = yield select(makeSelectToDos());
    try {
        const todosClone = Utils.deepCopy(todos);
        const findIndex = todosClone.findIndex(({ id }) => id === todoId);
        todosClone[findIndex].completed = checked;
        yield put(updateToDoAction(todosClone));
    } catch (e) {
        yield put(notifyError(e));
    }
}

// to create new todo
function* addToDo({ todo = '' }) {
    const todos = yield select(makeSelectToDos());
    try {
        const todosClone = Utils.deepCopy(todos);
        if (!todosClone.find(item => item.title === todo.trim())) {
            const newId = todosClone.length + 1;
            todosClone.unshift({
                title: todo,
                id: newId,
                userId: newId,
                completed: false,
            });
            yield put(updateToDoAction(todosClone));
            return;
        }
        yield put(notifyError({ message: 'ToDo is already available!' }));
    } catch (e) {
        yield put(notifyError(e));
    }
}

// Individual exports for testing
export default function* toDoSaga() {
    yield takeLatest(CHANGE_STATUS, updateStatus);
    yield takeLatest(ADD_TODO, addToDo);
}
