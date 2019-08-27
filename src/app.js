import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addExpenses, addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


const store = configureStore();
store.dispatch(addExpense({description: 'Water Bill', amount: 4500, createdAt: 1565974800000}));
store.dispatch(addExpense({description: 'Gas Bill', amount: 1200, createdAt: 1565974800001}));
store.dispatch(addExpense({description: 'Rent', amount: 109500, createdAt: 1565974800002}));



const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
