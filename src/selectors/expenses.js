import moment from 'moment';


// get visible expenses

export default (expenses, { text, sortBy, startDate, endDate, dateSortOrder, amountSortOrder}) => {
    return expenses.filter((expense) => {
        const dueDateMoment = moment(expense.dueDate);
        const startDateMatch = startDate ? startDate.isSameOrBefore(dueDateMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(dueDateMoment, 'day') : true; 
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch

    }).sort((a,b) => {
        if(sortBy === 'date') {            
            return dateSortOrder === 'ASC' ? (
                a.dueDate < b.dueDate ? 1 : -1
            ) : (
                b.dueDate < a.dueDate ? 1 : -1
            );
        }

        if(sortBy === 'amount') {
            return amountSortOrder === 'ASC' ? 
            (
                a.amount < b.amount ? 1 : -1
            ) : (
                b.amount < a.amount ? 1 : -1
            );
        }
    });
};