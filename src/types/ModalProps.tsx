import React from "react";

export type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
}