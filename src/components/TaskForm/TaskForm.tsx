import React, {useState} from 'react';
import {TaskItem} from "../../types/TaskItem";
import {FormProps} from "../../types/FormProps";
import Tag from "../../utils/Tag/Tag";
import './TaskForm.scss';

const TaskForm = ({setTasks, initData, isEditing, onClose}: FormProps) => {
    const [name, setName] = useState(
        initData?.name || ''
    );
    const [description, setDescription] = useState(
        initData?.description || ''
    );
    const [deadline, setDeadline] = useState(
        initData?.deadline || ''
    );
    const [tags, setTags] = useState(
        new Set(initData?.tags) || new Set<string>()
    );
    const [newTag, setNewTag] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isEditing && initData && onClose) {
            const updatedTask: TaskItem = {
                id: initData.id,
                name,
                description,
                deadline,
                tags: Array.from(tags),
                status: 'inProgress',
            }
            setTasks((prevTasks: TaskItem[]) => {
                const updatedTasks: TaskItem[] = prevTasks.map((currTask) => {
                    if (updatedTask.id === currTask.id) {
                        return updatedTask;
                    } else {
                        return currTask;
                    }
                });
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                return updatedTasks;
            });
            onClose();
        } else {
            const newTask: TaskItem = {
                id: Date.now().toString(),
                name,
                description,
                deadline,
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
    //
    const handleAddTag = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setTags(tags.add(newTag));
        setNewTag('');
    }
    //

    const onDelete = (value: string) => {
        setTags(prevTags => {
            const newTags = new Set(prevTags);
            newTags.delete(value);
            return newTags;
        });
    }

    return (
        <form className="NewTaskForm" onSubmit={handleSubmit}>
            <div className="InputGrid">
                <input
                    className="Input-Name text-input"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="task name"
                    required
                />
                <textarea
                    className="Input-Description text-input"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="description..."
                />
                <div className="TagForm">
                    <input
                        className="Input-Tag text-input"
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                        placeholder="type tag"
                    />
                    <button onClick={handleAddTag} className="SubmitButton tagButton">add tag</button>
                </div>
                <div className="Tags">
                    {Array.from(tags).map((tag, id) =>
                        <Tag tag={tag} id={id} onDelete={onDelete}/>
                    )}
                </div>
                <p>deadline:</p>
                <input
                    className="Input-Deadline text-input"
                    type="datetime-local"
                    value={deadline}
                    onChange={e => {setDeadline(e.target.value)}}
                    required
                />
            </div>
            <button type="submit" className="SubmitButton">{isEditing ? 'save' : 'add'}</button>
        </form>
    );
};

export default TaskForm;