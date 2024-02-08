import React from 'react';
import {ModalProps} from "../../types/ModalProps";
import './Modal.scss';

const Modal = ({ children, onClose } : ModalProps) => {
    const handleClose = () => {
        onClose();
    }

    return (
        <div className="Modal">
            <div className="Modal-Content">
                <button onClick={handleClose}>close</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;