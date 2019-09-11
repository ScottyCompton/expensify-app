import React from 'react';
import Modal from 'react-modal';

const ConfirmDeleteModal = (props) => (
    <Modal
        isOpen={props.isOpen || false}
        contentLabel="Confirm Delete"
        onRequestClose={props.handleCloseModal}
        closeTimeoutMS={200}
        className="modal"
    >
        <p className="modal__title">Delete This Expense?</p>
        <button className="button btnCancel button--withspace button--secondary" onClick={props.handleCloseModal}>Cancel</button>
        <button className="button btnConfirm button--withspace button--warning" onClick={props.handleRemove}>Confirm</button>
    </Modal>
);

export default ConfirmDeleteModal;