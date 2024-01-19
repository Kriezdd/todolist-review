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
        setTasks((prevTasks) => {
            const newTasks = [...prevTasks, newTask];
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return newTasks;
        });
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
            <button type="submit">add</button>
        </form>
    );
};

export default NewTaskForm;