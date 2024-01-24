import React, {useState} from 'react';
import {TaskItem} from "../../App";
import './TaskForm.scss';

interface FormProps {
    setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
    initData?: TaskItem;
    isEditing?: boolean;
    onClose?: () => void;
}

const TaskForm = ({setTasks, initData, isEditing, onClose}: FormProps) => {
    const [name, setName] = useState(
        initData?.name || ''
    );
    const [description, setDescription] = useState(
        initData?.description || ''
    );
    const [deadline, setDeadline] = useState(
        initData?.deadline.toString().slice(0, -8) || ''
    );
    const [tags, setTags] = useState(
        new Set(initData?.tags) || new Set<string>()
    );
    const [newTag, setNewTag] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditing && initData && onClose) {
            const updatedTask = {
                id: initData.id,
                name,
                description,
                deadline: new Date(deadline),
                tags: Array.from(tags),
                status: 'inProgress',
            }
            setTasks((prevTasks) => {
                const updatedTasks = prevTasks.map((currTask) => {
                    if (updatedTask.id === currTask.id) {
                        console.log('gotcha')
                        return updatedTask;
                    } else {
                        return currTask;
                    }
                });
                console.log(updatedTask);
                console.log(updatedTasks);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                return updatedTasks;
            });
            onClose();
        } else {
            const newTask: TaskItem = {
                id: Date.now().toString(),
                name,
                description,
                deadline: new Date(deadline),
                tags: Array.from(tags),
                status: 'inProgress',
            }
            setTasks((prevTasks) => {
                const newTasks = [...prevTasks, newTask];
                localStorage.setItem('tasks', JSON.stringify(newTasks));
                return newTasks;
            });
        }
        setName('');
        setDescription('');
        setDeadline('');
        setTags(new Set<string>());
    }

    const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setTags(tags.add(newTag));
            setNewTag('');
        }
    }

    return (
        <form className="NewTaskForm" onSubmit={handleSubmit}>
            <div className="InputGrid">
                <input
                    className="Input-Name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="task name"
                    required
                />
                <textarea
                    className="Input-Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="description..."
                />
                <input
                    className="Input-Tag"
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder="add tags (ENTER)"
                />
                <div className="Tags">
                    {Array.from(tags).map(tag =>
                        <div>{tag}</div>
                    )}
                </div>
                <p>deadline:</p>
                <input
                    className="Input-Deadline"
                    type="datetime-local"
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{isEditing?'save':'add'}</button>
        </form>
    );
};

export default TaskForm;