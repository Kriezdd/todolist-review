import React from "react";
import {TaskItem} from "./TaskItem";

export type FormProps = {
    setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
    initData?: TaskItem;
    isEditing?: boolean;
    onClose?: () => void;
}