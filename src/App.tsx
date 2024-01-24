import React, {useState} from 'react';
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/Tasks/TaskList/TaskList";
import './App.scss';

export interface TaskItem {
    id: string;
    name: string;
    description?: string;
    deadline: Date;
    tags: string[];
    status: string;
}

const App = () => {
    const [tasks, setTasks] = useState<TaskItem[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });



    console.log(tasks);

    return (
        <div className="App">
            <TaskForm setTasks={setTasks}/>
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default App;
