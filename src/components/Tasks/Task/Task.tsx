import React from 'react';
import {TaskItem} from "../../../App";
import './Task.scss';
import Tag from "../../../utils/Tag/Tag";

interface TaskProps {
    task: TaskItem;
}

const Task = ({task}: TaskProps) => {
    return (
        <div className="Task">
            <div className="Task-Info">
                <div className="Task-Info-Heading">
                    <h1>{task.name}</h1>
                    <div className="Task-Info-Tags">
                        {task.tags.map((tag, id) =>
                            <Tag tag={tag} id={id}/>
                        )}
                    </div>
                </div>
                <p>{task.description}</p>
                <div className="Task-Info-Deadline">
                    <p>deadline:</p>
                    <p>{(task.deadline).toString()}</p>
                </div>

            </div>
            <div className="Task-Controls">
                <p>done</p>
                <p>edit</p>
                <p>delete</p>
            </div>
        </div>
    );
};

export default Task;