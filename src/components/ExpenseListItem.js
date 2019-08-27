import React from 'react';
import { Link }  from 'react-router-dom';

const ExpenseListItem = ( {id, description, amount, createdAt} ) =>  (
        <div>
        <h3><Link to={`/edit/${id}`}>{description}</Link></h3>
        <div>{amount} - {createdAt}</div>

    </div>
);

export default ExpenseListItem;