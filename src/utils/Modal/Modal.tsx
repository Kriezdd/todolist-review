import React from 'react';
import './Modal.scss';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}
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