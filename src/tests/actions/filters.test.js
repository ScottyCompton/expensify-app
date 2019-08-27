import { 
    setStartDate, 
    setEndDate, 
    sortByAmount, 
    sortByDate, 
    setTextFilter 
    } from '../../actions/filters';
import moment from 'moment';

test('should generate setStartDate action object', () => {
    const now = moment();
    const action = setStartDate(now);
    
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: now
    });
    
});


test('should generate setEndDate action object', () => {
    const now = moment();
    const action = setEndDate(now);

    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: now
    });    
});


test('Should generate the sortByAmount action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});



test('Should generate the sortByDate action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});



test('Should generate the setTextFilter action object with a value given', () => {
    const testVal = "testing123"
    const action = setTextFilter(testVal);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: testVal
    });
});

test('Should generate the setTextFilter action object with no value given', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });

});