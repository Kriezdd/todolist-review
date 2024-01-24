import React, {useState} from 'react';
import {TaskItem} from "../../../App";
import './Task.scss';
import Tag from "../../../utils/Tag/Tag";
import TaskForm from "../../TaskForm/TaskForm";
import Modal from "../../../utils/Modal/Modal";

interface TaskProps {
    task: TaskItem;
    onDelete: (id: string) => void;
    onChangeStatus: (id: string) => void;
    setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}

const Task = ({task, onDelete, onChangeStatus, setTasks}: TaskProps) => {
    // track editing
    const [isEditing, setIsEditing] = useState(false);

    // transform deadline back into Date format
    const deadline = new Date(task.deadline);
    const dateStr = deadline.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        weekday: 'short',
    });
    const timeStr = deadline.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    })

    // changes styling based on progress
    const progressClassName = task.status === 'inProgress' ? 'inProgress': 'success';

    // changes styling based on status (ok/crunch/failed)
    const CRUNCH_THRESHOLD = 3 * 60 * 60 * 1000; // 3 hours in ms
    const timeLeft = deadline.getTime() - new Date().getTime();

    let statusClassName;
    if (timeLeft > CRUNCH_THRESHOLD) {
        statusClassName = 'ok';
    } else if (timeLeft > 0) {
        statusClassName = 'crunch';
    } else {
        statusClassName = 'failed';
    }

    return (
        <div className={`Task ${progressClassName} ${statusClassName}`}>
            {isEditing && (
                <Modal onClose={() => setIsEditing(false)}>
                    <TaskForm
                        setTasks={setTasks}
                        initData={task}
                        isEditing={isEditing}
                        onClose={() => setIsEditing(false)}
                    />
                </Modal>
            )}
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
                    {/* todo: make timer (days>hours>minutes) remaining*/}
                    {/* todo: change task-styling if remains less than 2h)*/}
                    <p>deadline: {dateStr}, {timeStr} | status: <span>{statusClassName}</span></p>
                </div>

            </div>
            <div className="Task-Controls">
                <button
                    className={`StatusButton`}
                    onClick={() => onChangeStatus(task.id)}
                >
                    {task.status === 'inProgress' ? <>finish</> : <>undo</>}
                </button>
                <button
                    className="EditButton"
                    onClick={() => setIsEditing(true)}
                >
                    edit
                </button>
                <button
                    className="DeleteButton"
                    onClick={() => onDelete(task.id)}
                >
                    delete
                </button>
            </div>
        </div>
    );
};

export default Task;