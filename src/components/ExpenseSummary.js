import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'
import selectExpenseTotal from '../selectors/expense-total';
import selecteExpenses from '../selectors/expenses';

export const ExpenseSummary = (props) => {
    const totalRecs = props.expenses ? props.expenses.length : 0;
    const totalAmt = selectExpenseTotal(props.expenses);
    return (
        <div>Viewing {totalRecs} expense{(totalRecs >= 2 || totalRecs === 0) && <span>s</span>} totalling {numeral(totalAmt/100).format('$0,0.00')}</div>
    )
    
};

const mapStateToProps = (state) => {
    return {
        expenses: selecteExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);