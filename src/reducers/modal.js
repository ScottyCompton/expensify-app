
const modalDefaultState = {isOpen: false};

// expenses reducer

export default (state = modalDefaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_DELETE_EXPENSE_MODAL':
            return  {isOpen: action.isOpen};

        default:
            return state;
    }
};

