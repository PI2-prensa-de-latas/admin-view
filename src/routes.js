import React from 'react';

import { isAuthenticated } from './services/auth';

import LoginScreen from './screens/login';
import PromoScreen from './screens/promotions';
import NewPromo from './screens/newPromo';
import EditPromo from './screens/editPromo';

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
            isAuthenticated() === true
            ? <Component {...props} />
            : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
              }} />
        )} />
);


const Routes = () => (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={LoginScreen} />
                <Route exact path='/promos' component={PromoScreen} />
                <Route exact path='/new_promo' component={NewPromo} />
                <Route exact path='/edit_promo' component={EditPromo} />
                <Redirect from="*" to="/promos"/>
            </Switch>
        </BrowserRouter>
);

export default Routes;