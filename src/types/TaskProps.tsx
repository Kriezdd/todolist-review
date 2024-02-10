import {TaskItem} from "./TaskItem";
import React from "react";

export type TaskProps = {
    task: TaskItem;
    onDelete: (id: string) => void;
    onChangeStatus: (id: string) => void;
    setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}