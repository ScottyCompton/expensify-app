import expenses from "../reducers/expenses";
import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';




export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : "",
            note: props.expense ? props.expense.note : "",
            amount: props.expense ? ((props.expense.amount)/100).toFixed(2) : "",
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
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

    handleDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({ createdAt }));
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
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }

    };

    render () {
        return (

                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input type="text" 
                        placeholder="Description"
                        value={this.state.description}
                        className="text-input"
                        onChange={this.onDescriptionChange}
                        autoFocus 
                    />
                    <input type="number"
                        placeholder="amount" 
                        className="text-input"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.handleDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onCalendarFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea 
                        placeholder="Add a note for your expense (optional)"
                        onChange={this.onNoteChange}
                        value={this.state.note}
                        className="textarea"
                        >
                    </textarea>
                    <div>
                        <button className="button button--primary" type="submit">{this.state.btnText}</button>
                    </div>
                </form>
        );
    }
}

