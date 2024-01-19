import React from 'react';
import Task from "./Task";
import {TaskItem} from "../../App";

interface TaskListProps {
    tasks: TaskItem[];
}

const TaskList = ({ tasks } : TaskListProps) => {
    return (
        <div>
            {tasks.map(task => <Task task={task}/>)}
        </div>
    );
};

export default TaskList;