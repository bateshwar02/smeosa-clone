import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';

import * as Actions from './action';
import ToDos from '../ToDo/Loadable';
import Login from '../Login/Loadable';
import Home from '../Home/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Notification from '../../components/Notification/Loadable';
import Details from '../Details/Loadable';

export function App() {
    return (
        <>
            <Notification />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/todo" component={ToDos} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/details" component={Details} />
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
