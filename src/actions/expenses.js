import uuid from 'uuid';
import {db} from '../firebase/firebase';

// ADD_EXPENSE ACTION
export const addExpense = (expense) => {

    return {
        type: 'ADD_EXPENSE',
        expense    
    };
}

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {description = '', note = '', amount = 0, createdAt = 0} = expenseData;
        const expense = {description, amount, createdAt, note};

        return db.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    };
};



// UPDATE_EXPENSE ACTION
export const editExpense = (id, updates) => {
    return ({
        type: 'UPDATE_EXPENSE',
        id,
        updates
    })
};


export const startEditExpense = (id, updates) => {
    return(dispatch) => {
        return db.ref(`expenses/${id}`).set({
            ...updates
        }).then((snapshot) => {
            dispatch(editExpense(id, updates));
        });
    }
};



// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({id} = {}) => {
    return (dispatch) => {
        return  db.ref(`expenses/${id}`).remove().then((snapshot) => {
            dispatch(removeExpense({id}));
        });
    }
};


// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses = () => {
    return (dispatch) => {
        return db.ref('expenses').once('value').then((snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            dispatch(setExpenses(expenses));
        });
    }
}