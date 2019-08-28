import React from 'react';
import { shallow } from 'enzyme';
import testData from '../fixtures/expenses';
import { ExpenseSummary } from '../../components/ExpenseSummary';


let expenses, wrapper;

beforeEach(() => {
    expenses = testData;
    wrapper = shallow(<ExpenseSummary expenses={expenses} />)
})


test('Should render ExpenseSummary Component', () => {
    expect(wrapper).toMatchSnapshot();
});


test('Should render total from a single entry', () => {
    const expense = expenses[0];

    wrapper.setProps({expenses: [expense]});
    expect(wrapper).toMatchSnapshot();
});


test('Should render with an empty array', () => {
    wrapper.setProps({expenses: []});
    expect(wrapper).toMatchSnapshot();
});
