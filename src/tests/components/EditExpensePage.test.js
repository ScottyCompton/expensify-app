import React from 'react';
import { shallow } from 'enzyme';
import testData from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';



let editExpense, removeExpense, history, wrapper, expense;

beforeEach(() => {
    expense = testData[0];
    
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = {
        push: jest.fn()
    };

    wrapper = shallow(<EditExpensePage 
        expense={expense} 
        removeExpense={removeExpense} 
        editExpense={editExpense} 
        history={history} />);
});


test('Should render Edit Expense Page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle expense update', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);   
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
});


test('Should handle remove expense', () => {
    const id = expense.id;
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(removeExpense).toHaveBeenLastCalledWith({id});
});
