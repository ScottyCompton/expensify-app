import React from 'react';
import { AddExpensePage } from '../../components/AddExpensePage';
import { shallow } from 'enzyme';
import testData from '../fixtures/expenses';


let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn();
    history = {
        push: jest.fn()
    };
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('Should render the add expense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle onSubmit', () => {
    const expense = testData[0];
    wrapper.find('ExpenseForm').prop('onSubmit')(expense)   
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expense);
});