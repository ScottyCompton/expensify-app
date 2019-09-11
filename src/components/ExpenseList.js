import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selecteExpenses from '../selectors/expenses';
import ListSortOrderArrow from './ListSortOrderArrow';
import { setListDateSortOrder, setListAmountSortOrder } from '../actions/listSortOrder';
import { sortByDate, sortByAmount } from '../actions/filters';

export class ExpenseList extends React.Component {
    constructor(props) {
        super(props);
    }

    

    handleToggleDateSortOrder = (e) => {
        e.preventDefault();
        const sortOrder = this.props.listSortOrder.dateSortOrder === 'INACTIVE' ? 'ASC' :  this.props.listSortOrder.dateSortOrder === 'ASC' ? 'DESC' : 'ASC';
        this.props.toggleListDateSortOrder(sortOrder);
        this.props.sortByDate();
    }

    handleToggleAmountSortOrder = (e) => {
        e.preventDefault();
        const sortOrder = this.props.listSortOrder.amountSortOrder === 'INACTIVE' ? 'ASC' :  this.props.listSortOrder.amountSortOrder === 'ASC' ? 'DESC' : 'ASC';
        this.props.toggleListAmountSortOrder(sortOrder)
        this.props.sortByAmount();
    }
    
    render() {
        return (
            <div className="content-container">
                <div className="list-header">
                    <div className="show-for-mobile list-header-title">Expense</div>
                    <div className="show-for-desktop list-header-title">Expense</div>
                    <div className="list-header-duedate">
                        Due <span className="show-for-desktop"> Date</span>
                        <ListSortOrderArrow handleClick={this.handleToggleDateSortOrder} sortOrder={this.props.listSortOrder.dateSortOrder} />    
                    </div>
                    <div className="list-header-amount">
                        Amt
                        <ListSortOrderArrow handleClick={this.handleToggleAmountSortOrder} sortOrder={this.props.listSortOrder.amountSortOrder} />    
                    </div>
                </div>
                <div className="list-body">
                    {
                        this.props.expenses.length === 0 ? (
                            <div className="list-item list-item--message">
                                <span>No Expenses</span>
                            </div>
                            
                        ) : (
                            this.props.expenses.map((expense) => (
                                <ExpenseListItem key={expense.id} {...expense} />
                                )
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        expenses: selecteExpenses(state.expenses, {...state.filters, ...state.listSortOrder}),
        listSortOrder: state.listSortOrder
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleListDateSortOrder: (sortOrder)  => dispatch(setListDateSortOrder(sortOrder)),
        toggleListAmountSortOrder: (sortOrder)  => dispatch(setListAmountSortOrder(sortOrder)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
