const defaultListSortOrder = {
    dateSortOrder: 'DESC',
    amountSortOrder: 'INACTIVE'
}

export default (state = defaultListSortOrder, action) => {
    switch (action.type) {
        case 'DATE_SORT_ORDER':
            return {
                ...state,
                dateSortOrder: action.sortOrder,
                amountSortOrder: 'INACTIVE'
            }
        
        case 'AMOUNT_SORT_ORDER':
            return {
                ...state,
                dateSortOrder: 'INACTIVE',
                amountSortOrder: action.sortOrder
            }
        
        default:
            return state;
    }
}