/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';

import * as Actions from './action';
import ToDos from '../ToDo/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Notification from '../../components/Notification/Loadable';

export function App() {
    return (
        <>
            <Notification />
            <Switch>
                <Route exact path="/" component={ToDos} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    );
}

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(App);
