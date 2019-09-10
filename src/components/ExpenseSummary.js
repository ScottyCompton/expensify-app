import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'
import { Link } from 'react-router-dom';
import selectExpenseTotal from '../selectors/expense-total';
import selecteExpenses from '../selectors/expenses';

export const ExpenseSummary = (props) => {
    const totalRecs = props.expenses ? props.expenses.length : 0;
    const totalAmt = selectExpenseTotal(props.expenses);
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{totalRecs}</span> expense{(totalRecs >= 2 || totalRecs === 0) && <span>s</span>} totalling <span>{numeral(totalAmt/100).format('$0,0.00')}</span></h1>        
                <div page-header__actions>
                    <Link className="button button--primary" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
    
};

const mapStateToProps = (state) => {
    return {
        expenses: selecteExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);