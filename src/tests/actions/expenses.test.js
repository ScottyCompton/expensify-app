import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'}); 
    expect(action).toEqual({type: 'REMOVE_EXPENSE', id: '123abc'});
});

test('should update an expense note', () => {
    const id = "123abc";
    const note = "Testing123";

    const action = editExpense(id, {note: note});
    expect(action).toEqual({
        type: 'UPDATE_EXPENSE',
        id: id,
        updates: {
            note: note
        }
    });
});


test('should setup addExpense action object with provided values', () => {

    const expenseData = {
        description: 'Testing 123', 
        note: 'testing 123', 
        amount:  100, 
        createdAt: 1000
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup addExpense action object with default values', () => {  
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '', 
            note: '', 
            amount:  0, 
            createdAt: 0
        }
    });    
});