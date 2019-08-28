import selectExpenseTotal from '../../selectors/expense-total';
import testData from '../fixtures/expenses';

test('Should return 0 if no expenses present', () => {
    const result = selectExpenseTotal([]);
    expect(result).toBe(0);
});

test('Should return total from a single expense', () => {
    const expense = testData[0];
    const expectedResult = expense.amount;
    const result = selectExpenseTotal([expense]);
    expect(result).toBe(expectedResult);
});


test('Should return total from multiple expenses', () => {
    const expenses = testData;
    const expectedResult =  expenses.reduce((total, expense) => {
        return total + expense.amount;
    },0);    
    
    const result = selectExpenseTotal(expenses);
    expect(result).toBe(expectedResult);
    
})