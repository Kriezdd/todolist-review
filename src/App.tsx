import React, {useState} from 'react';
import {TaskItem} from "./types/TaskItem";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/Tasks/TaskList/TaskList";
import './App.scss';

const App = () => {
    const [tasks, setTasks] = useState<TaskItem[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    return (
        <div className="App">
            <TaskForm setTasks={setTasks}/>
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default App;
