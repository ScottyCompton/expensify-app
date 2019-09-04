
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import db from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('Should add expense to the database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        
        return db.ref(`/expenses/${actions[0].expense.id}`).once('value');
        
    
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
    }).finally(() => {
        done();
    });
});

test('Should add expense with defaults to the database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        
        return db.ref(`/expenses/${actions[0].expense.id}`).once('value');
        
    
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
    }).finally(() => {
        done();
    });
});


// test('should setup addExpense action object with default values', () => {  
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '', 
//             note: '', 
//             amount:  0, 
//             createdAt: 0
//         }
//     });    
// });