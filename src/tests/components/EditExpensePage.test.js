import React from 'react';
import { shallow } from 'enzyme';
import testData from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';



let editExpense, startRemoveExpense, history, wrapper, expense;

beforeEach(() => {
    expense = testData[0];
    
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = {
        push: jest.fn()
    };

    wrapper = shallow(<EditExpensePage 
        expense={expense} 
        startRemoveExpense={startRemoveExpense} 
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


test('Should handle startRemoveExpense', () => {
    const id = expense.id;
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id});
});
