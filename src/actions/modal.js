

export const handleOpenModal = () => ({
    type: 'TOGGLE_DELETE_EXPENSE_MODAL',
    isOpen: true
});

export const handleCloseModal = () => ({
    type: 'TOGGLE_DELETE_EXPENSE_MODAL',
    isOpen: false
})
