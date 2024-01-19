import React, {useState} from 'react';
import {TaskItem} from "../../App";
import './NewTaskForm.scss';

interface FormProps {
    setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}

const NewTaskForm = ({setTasks}: FormProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [tags, setTags] = useState(new Set<string>());
    const [newTag, setNewTag] = useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newTask: TaskItem = {
            id: Date.now().toString(),
            name,
            description,
            deadline: new Date(deadline),
            tags: Array.from(tags),
            status: 'inProgress',
        }
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setName('');
        setDescription('');
        setTags(new Set<string>());
        setDeadline('');
    }

    const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setTags((prevTags) => prevTags.add(newTag));
            setNewTag('');
        }
    }

    return (
        <form className="NewTaskForm" onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
            />
            <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
            />
            <div className="Tags">
                {Array.from(tags).map(tag =>
                    <div>{tag}</div>
                )}
            </div>
            <input
                type="date"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                required
            />
            <input
                type="time"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default NewTaskForm;