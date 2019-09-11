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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {description = '', note = '', amount = 0, dueDate = 0} = expenseData;
        const expense = {description, amount, dueDate, note};

        return db.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
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
    return(dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return  db.ref(`users/${uid}/expenses/${id}`).remove().then((snapshot) => {
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return db.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
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