import React, {ChangeEvent, useEffect, useState} from 'react';
import Task from "../Task/Task";
import {TaskItem} from "../../../App";
import './TaskList.scss';

interface TaskListProps {
    tasks: TaskItem[];
    setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}

const TaskList = ({tasks, setTasks}: TaskListProps) => {
    const [loadedTasks, setLoadedTasks] = useState<TaskItem[]>(() => {
        return JSON.parse(localStorage.getItem('tasks') ?? '[]');
    });
    const [selectedOrder, setSelectedOrder] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    const handleDelete = (id: string) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(() => {
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

    // sort and filter
    const allTags = Array.from(new Set(tasks.flatMap(task => task.tags || [])));
    let filteredTasks = tasks;
    const handleOrderSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOrder(event.target.value);
    }
    switch (selectedOrder) {
        case '':
            tasks.sort((a, b) => Number(a.id) - Number(b.id));
            break;
        case 'ascending':
            tasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
            break;
        case 'descending':
            tasks.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
            break;
    }
    const handleTagSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value);
    }
    if (selectedTag !== '') {
        filteredTasks = tasks.filter(task => task.tags.includes(selectedTag));
    }

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
            <div className="Task-Sort">
                <div className="SortContainer">
                    <h3 className="SubTitle">sort by deadline:</h3>
                    <select onChange={handleOrderSelect} className="SortBy Deadline">
                        <option value='' selected>DISABLED</option>
                        <option value={'ascending'}>ascending</option>
                        <option value={'descending'}>descending</option>
                    </select>
                </div>
                <div className="SortContainer">
                    <h3 className="SubTitle">filter by tag:</h3>
                    <select onChange={handleTagSelect} className="SortBy Tags">
                        <option value='' selected>DISABLED</option>
                        {allTags.map(tag => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {filteredTasks.map(task => (
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