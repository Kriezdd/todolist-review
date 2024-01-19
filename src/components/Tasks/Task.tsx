import React from 'react';
import {TaskItem} from "../../App";

interface TaskProps {
    task: TaskItem;
}

const Task = ({task}: TaskProps) => {
    return (
        <div>
            <h1>{task.name}</h1>
            <p>{task.description}</p>
            <p>{task.deadline.toString()}</p>
            {task.tags.map(tag =>
                <p>{tag}</p>
            )}
        </div>
    );
};

export default Task;