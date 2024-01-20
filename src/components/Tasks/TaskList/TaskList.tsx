import React from 'react';
import Task from "../Task/Task";
import {TaskItem} from "../../../App";
import './TaskList.scss';

interface TaskListProps {
    tasks: TaskItem[];
}

const TaskList = ({ tasks } : TaskListProps) => {
    return (
        <div className="TaskList">
            {tasks.length ? <h1 className="Title">do it:</h1> : null}
            {tasks.map(task => <Task task={task}/>)}
        </div>
    );
};

export default TaskList;