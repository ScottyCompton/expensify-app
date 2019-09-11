import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import { handleOpenModal, handleCloseModal } from '../actions/modal';

export class EditExpensePage extends React.Component {
    constructor(props) {
        super(props);
    }


    handleUpdate = (expense) => {
       this.props.startEditExpense(this.props.expense.id, expense);
       this.props.history.push('/');
    }

    handleRemove = () => {
        this.props.startRemoveExpense({id: this.props.expense.id});
        this.props.history.push('/');
        this.props.handleCloseModal();
    }



    render() {
        return (
        <div>
        
            
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit Expense</h1>
                </div>
            </div>

            <div className="content-container">
                <ExpenseForm 
                    onSubmit={this.handleUpdate}
                    expense={this.props.expense}
                    handleOpenModal={this.props.handleOpenModal} />
            </div>
            {<ConfirmDeleteModal 
            isOpen={this.props.isOpen}
            handleCloseModal={this.props.handleCloseModal}
            handleRemove={this.handleRemove}
            />}

        </div>
        );       
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        startEditExpense: (id, expense) => {dispatch(startEditExpense(id, expense))},
        startRemoveExpense: (id) => {dispatch(startRemoveExpense(id))},
        handleOpenModal: () => {dispatch(handleOpenModal())},
        handleCloseModal: () => {dispatch(handleCloseModal())},
    }
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id),
        isOpen: state.modal.isOpen
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)
