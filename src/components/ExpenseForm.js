import expenses from "../reducers/expenses";
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { Link }  from 'react-router-dom';




export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : "",
            note: props.expense ? props.expense.note : "",
            amount: props.expense ? ((props.expense.amount)/100).toFixed(2) : "",
            dueDate: props.expense ? moment(props.expense.dueDate) : moment(),
            calendarFocused: false,
            error: "",
            btnText: props.expense ? "Update Expense" : "Add Expense"
        };
    }




    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        const re = /^\d{1,}(\.\d{0,2})?$/; 
        if(!amount || amount.match(re)) {
            this.setState(() => ({amount}))
        }
    };

    handleDateChange = (dueDate) => {
        if(dueDate) {
            this.setState(() => ({ dueDate }));
        }
        
    };


    onCalendarFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused}));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            // set error state - please provide a description and an amount
            this.setState(() => ({error: "Please provide a desscription and an amount."}));
        } else {
            this.setState(() => ({error: ""}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                dueDate: this.state.dueDate.valueOf(),
                note: this.state.note
            })
        }

    };

    render () {
        return (

                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <label htmlFor="expense-description">Description:</label>
                    <input type="text"
                        id="expense-description" 
                        placeholder="Enter a brief description"
                        value={this.state.description}
                        className="text-input"
                        onChange={this.onDescriptionChange}
                        autoFocus 
                    />
                    <label htmlFor="expense-amount">Amount ($):</label>
                    <input type="number"
                        id="expense-amount"
                        placeholder="Enter the amount in USD ($)" 
                        className="text-input"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <label htmlFor="expense-duedate">Due Date:</label>
                    <SingleDatePicker
                        id={"expense-duedate"}
                        date={this.state.dueDate}
                        onDateChange={this.handleDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onCalendarFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <label htmlFor="expense-note">Expense Note (optional):</label>
                    <textarea 
                        placeholder="Add a note for this expense"
                        onChange={this.onNoteChange}
                        value={this.state.note}
                        className="textarea"
                        >
                    </textarea>
                    <div className="form__buttons">                    
                        <Link to="/dashboard" className="button button--secondary button--withleftspace">Cancel</Link>
                        {this.props.expense && <button className="button btnRemove button--secondary button--withleftspace button--secondary" type="button" onClick={this.props.handleOpenModal}>Remove</button>}
                        <button className="button btnSubmit button--withleftspace button--primary" type="submit">{this.state.btnText}</button>
                    </div>
                </form>
        );
    }
}

