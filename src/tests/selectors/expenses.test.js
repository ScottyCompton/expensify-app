import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import testData from '../fixtures/expenses';


test('Should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(testData, filters);
    expect(result).toEqual([testData[2], testData[1]]);

});

test('Should filter by start date', () => {
    const startDate = moment(0);

    const filters = {
        text: '',
        sortBy: 'date',
        startDate: startDate,
        endDate: undefined
    }

    const result = selectExpenses(testData, filters);
    expect(result).toEqual([testData[2], testData[0]]);

});


test('Should filter by end date', () => {
    const endDate = moment(0);

    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: endDate
    }

    const result = selectExpenses(testData, filters);
    expect(result).toEqual([testData[0], testData[1]]);

});


test('Should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }   
    const result = selectExpenses(testData, filters);
    expect(result).toEqual([testData[2], testData[0], testData[1]]);
});


test('Should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }   
    const result = selectExpenses(testData, filters);
    expect(result).toEqual([testData[1], testData[2], testData[0]]);
});

