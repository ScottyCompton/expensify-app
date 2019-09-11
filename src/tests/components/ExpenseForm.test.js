import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import testData from '../fixtures/expenses';
import moment from 'moment'

test('Should render expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render form with data provided', () => {
    const wrapper = shallow(<ExpenseForm expense={testData[0]} />);
    expect(wrapper).toMatchSnapshot();
});



test('Should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});


test('Should set description on input change', () => {
    const value = 'New Description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
});



test('Should set note on textarea change', () => {
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
});


test('Should set amount if input is valid', () => {
    const value = '12.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});




test('Should not set amount if input is invalid', () => {
    const value = 'fuck you';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});


test('Should call onSubmit prop for valid form submission', () =>{
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={testData[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        amount: testData[0].amount,
        description: testData[0].description,
        createdAt: testData[0].createdAt,
        note: testData[0].note
    });
});

test('Should set new date onDateChange', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});


test('Should set calendar focus onchange', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);

});



test('Should handle remove open modal', () => {
    const onSubmitSpy = jest.fn();
    const onHandleOpenModalSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={testData[0]} handleOpenModal={onHandleOpenModalSpy} onSubmit={onSubmitSpy} />);

    wrapper.find('.btnRemove').simulate('click');
    expect(onHandleOpenModalSpy).toHaveBeenCalled();
});
