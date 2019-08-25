import uuid from 'uuid';

// ADD_EXPENSE ACTION
export const addExpense = (
    {
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt

    }
});


// EDIT_EXPENSE ACTION
export const editExpense = (id, updates) => ({
type: 'EDIT_EXPENSE',
id,
updates
});



// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
type: 'REMOVE_EXPENSE',
id
});
