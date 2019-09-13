import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddExpensePage from '../components/AddExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
export const history = createHistory();


const AppRouter = () => (
    <Router history={history}>
        <Route render={({location}) => {
            return (
                <TransitionGroup className="RTG">
                <CSSTransition 
                    key={location.key}
                    timeout={600}
                    classNames="fade"
                >
                    <div>
                    <Switch location={location}>
                        <PublicRoute path="/" component={LoginPage} exact={true} />
                        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                        <PrivateRoute path="/create" component={AddExpensePage} />
                        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                    </div>
                </CSSTransition>
           </TransitionGroup>
            );
        }} />

    </Router>
);


export default AppRouter;