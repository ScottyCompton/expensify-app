
export const setListDateSortOrder = (sortOrder='DESC') => ({
    type: 'DATE_SORT_ORDER',
    sortOrder
});

export const setListAmountSortOrder = (sortOrder='DESC') => ({
    type: 'AMOUNT_SORT_ORDER',
    sortOrder
});
