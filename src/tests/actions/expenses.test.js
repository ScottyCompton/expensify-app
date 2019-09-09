import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense, 
    addExpense, 
    editExpense, 
    removeExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import {db} from '../../firebase/firebase';

const uid = 'testid123abc';
const createMockStore = configureMockStore([thunk]);
const defaultAuthState = { auth: {uid} };

beforeEach((done) => {
    const expensesData = {};

    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt};
    });
    db.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
}); 


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
    const store = createMockStore(defaultAuthState);
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
        
        return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        
    
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
    }).finally(() => {
        done();
    });
});





test('Should add expense with defaults to the database and store', (done) => {
    const store = createMockStore(defaultAuthState);
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
        
        return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        
    
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
    }).finally(() => {
        done();
    });
});



test('should remove expense from Firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return db.ref(`users/${uid}/expenses/${id}`).once('value')
    })
    .then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
    })
    .finally(() => {
        done();
    });
});



test('Should setup set expense action object with data', () => {
    const action = setExpenses(expenses);

    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});



test('Should fetch the expenses from Firebase', (done) => {

    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const tmpActions = store.getActions();
        
        const actions = {
            type: tmpActions[0].type,
            expenses: tmpActions[0].sort((a,b) => {
                return a.createdAt < b.createdAt ? 1 : -1;
            })
        }

        const testExpenses = expenses.sort((a,b) => {
            return a.createdAt < b.createdAt ? 1 : -1;
        })

        expect(actions).toEqual({
            type: 'SET_EXPENSES',
            testExpenses
        });
        //done();
    }).finally(() => done());
});



test('Should update a given expense', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    
    const updates = {
        description: 'update test',
        note: 'update note',
        amount: 0,
        createdAt: 0
    }

    store.dispatch(startEditExpense(id,updates))
    .then((snapshot) => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'UPDATE_EXPENSE',
            id,
            updates
        });

        return db.ref(`users/${uid}/expenses/${id}`).once('value')
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(updates);
        });  

    }).finally(() => {
        done();
    });

});
