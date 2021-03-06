import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import modalReducer from '../reducers/modal';
import listSortOrderReducer from '../reducers/listSortOrder';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Redux store creation

    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer,
            modal: modalReducer,
            listSortOrder: listSortOrderReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}


