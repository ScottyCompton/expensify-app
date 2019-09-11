import React from 'react';
import { shallow } from 'enzyme';
//import testData from '../fixtures/expenses';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';


let wrapper, isOpen, handleCloseModal, handleRemove;

beforeEach(() => {
    isOpen = true;
    handleCloseModal = jest.fn();
    handleRemove = jest.fn();

    wrapper = shallow(<ConfirmDeleteModal isOpen={isOpen} handleCloseModal={handleCloseModal} handleRemove={handleRemove} />);
});


test('Should render delete expense modal', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should render empty modal div',() => {
    wrapper.setProps({isOpen: false});
    expect(wrapper).toMatchSnapshot();
});


test('Should close the modal window', () => {
    wrapper.find('.btnCancel').simulate('click');
    expect(handleCloseModal).toHaveBeenCalled();
});


test('Should close the modal window after selecting remove', () => {
    wrapper.find('.btnConfirm').simulate('click');
    expect(handleRemove).toHaveBeenCalled();
});

