import React from 'react';
import { Link }  from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ( {id, description, amount, dueDate} ) =>  (

        <Link className="list-item" to={`/edit/${id}`} title="Click to edit this expense">
          <div className="list-item__wrapper">
            <div className="list-item__title">
              <span>{description}</span>
            </div>
            <div className="list-item__duedate">
            <span className="show-for-desktop">{moment(dueDate).format('MMMM Do, YYYY')}</span>
            <span className="show-for-mobile">{moment(dueDate).format('M/D/YYYY')}</span>
            </div>
            <div className="list-item__data">
              <span>{numeral(amount/100).format('$0,0.00')}</span>
            </div>                  
          </div>
        </Link>


);

export default ExpenseListItem;