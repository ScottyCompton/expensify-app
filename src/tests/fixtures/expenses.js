import moment from 'moment';

export default [
    {
        id: "alsdjfklj",
        description: "Gum",
        note: "",
        amount: 2,
        dueDate: 0
    },
    
    {
        id: "23kwo8jhsdflk",
        description: "Rent",
        note: "",
        amount: 109500,
        dueDate: moment(0).subtract(4, "days").valueOf()
    },
    {
        id: "slilsdfhueh",
        description: "Credit Card",
        note: "",
        amount: 4500,
        dueDate: moment(0).add(4, "days").valueOf()
    }
];

