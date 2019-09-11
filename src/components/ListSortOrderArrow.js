import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';
import {faSortUp, faSortDown, faCaretRight} from '@fortawesome/free-solid-svg-icons'

const ListSortOrderArrow = (props) => {
    const inactiveArrow = (
        <Link to="/" onClick={props.handleClick}>
        <FontAwesomeIcon size="lg" icon={faCaretRight} />
        </Link>
    );

    const ascArrow = (
        <Link to="/" onClick={props.handleClick}>
        <FontAwesomeIcon size="lg" icon={faSortUp} />
        </Link>
    );

    const descArrow = (
        <Link to="/" onClick={props.handleClick}>
        <FontAwesomeIcon size="lg" icon={faSortDown} />
        </Link>
    );


    return (
        <span className={`sortorder-arrow sortorder-arrow--${props.sortOrder.toLowerCase()}`}>
            {props.sortOrder === 'INACTIVE' ? inactiveArrow : props.sortOrder === 'ASC' ? ascArrow : descArrow}
        </span>
    )
}

export default ListSortOrderArrow;