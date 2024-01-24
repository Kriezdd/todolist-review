import React, {useEffect, useState} from 'react';
import Task from "../Task/Task";
import {TaskItem} from "../../../App";
import './TaskList.scss';

interface TaskListProps {
    tasks: TaskItem[];
    setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}

const TaskList = ({tasks, setTasks}: TaskListProps) => {
    const [loadedTasks, setLoadedTasks] = useState<TaskItem[]>(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
        return savedTasks;
    });

    const handleDelete = (id: string) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks((prevTasks) => {
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return newTasks;
        });
    };

    const handleChangeStatus = (taskId: string) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task: TaskItem) => {
                if (task.id !== taskId) {
                    return task;
                }

                const newStatus = task.status === 'inProgress' ? 'done' : 'inProgress';
                return {...task, status: newStatus as "inProgress" | "done"} as TaskItem;
            });

            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    // sync localStorage with tasks to re-render when changing;
    useEffect(() => {
        setLoadedTasks(tasks);
    }, [tasks]);
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(loadedTasks))
    }, [loadedTasks]);

    return (
        <div className="TaskList">
            {tasks.length ? <h1 className="Title">do it:</h1> : null}
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                    onChangeStatus={handleChangeStatus}
                    setTasks={setTasks}
                />
            ))}
        </div>
    );
};

export default TaskList;