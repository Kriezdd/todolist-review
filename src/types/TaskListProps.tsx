import React from "react";
import {TaskItem} from "./TaskItem";

export type TaskListProps = {
    tasks: TaskItem[];
    setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}