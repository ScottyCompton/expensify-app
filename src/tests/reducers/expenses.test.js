import expensesReducer from '../../reducers/expenses';
import testData from '../fixtures/expenses';


const existingTestExpenseId = 1;
const newTestExpenseId = 4;
const testExpense = {
    id: existingTestExpenseId,
    description: 'MOOO',
    note: 'OOOOINNK!',
    createdAt: 0,
    amount: 10000
}; 

test('Should test the default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});


test('Should remove an expense by id', () => {

    const action = {
        type: 'REMOVE_EXPENSE',
        id: 2
    }

    const state = expensesReducer(testData, action)
    expect(state).toEqual([testData[0], testData[2]]);
});


test('Should not remove an expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -10
    }
    const state = expensesReducer(testData, action)
    expect(state).toEqual(testData);
});


test('Should add an expense to the expenses state array', () => {
    const expense = testExpense;
    expense.id = newTestExpenseId;

    const action = {
        type: 'ADD_EXPENSE',
        expense
    };

    const state = expensesReducer(testData, action)
    expect(state).toEqual([...testData, expense]);

});


test('Should update a selected expense', () => {

    const action = {
        type: 'UPDATE_EXPENSE',
        updates: testExpense,
        id: existingTestExpenseId
    };

    const state = expensesReducer(testData, action);
    expect(state[0]).toEqual(testExpense);

 });

 test('Should update any expenses if id not found', () => {

    const action = {
        type: 'UPDATE_EXPENSE',
        updates: testExpense,
        id: -1
    };

    const state = expensesReducer(testData, action);
    expect(state).toEqual(testData);

 });



 test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [testData[1]]
    };

    const state = expensesReducer(testData, action);
    expect(state).toEqual([testData[1]]);
});
