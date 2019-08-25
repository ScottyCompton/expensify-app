import React from 'react';

const EditExpensePage = (props) => {
    console.log(props);
    return (
    <div>
        Editing the expense with the id {props.match.params.id}.
    </div>
    );
};


export default EditExpensePage;