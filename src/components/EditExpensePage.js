import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';


export class EditExpensePage extends React.Component {
    constructor(props) {
        super(props);
    }


    handleUpdate = (expense) => {
       this.props.editExpense(this.props.expense.id, expense);
       this.props.history.push('/');
    }

    handleRemove = () => {
        this.props.removeExpense({id: this.props.expense.id});
        this.props.history.push('/');
    }


    render() {
        return (
        <div>
            <ExpenseForm 
                onSubmit={this.handleUpdate}
                expense={this.props.expense} />
                {this.props.expense && <button className="btnRemove" onClick={this.handleRemove}>Remove</button>}

        </div>
        );       
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        editExpense: (id, expense) => {dispatch(editExpense(id, expense))},
        removeExpense: (id) => {dispatch(removeExpense(id))}
    }
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)
