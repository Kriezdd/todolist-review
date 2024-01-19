import React, {useState} from 'react';
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TaskList from "./components/Tasks/TaskList";
import './App.scss';

export interface TaskItem {
    id: string;
    name: string;
    description?: string;
    deadline: Date;
    tags: string[];
    status: 'inProgress' | 'done';
}

const App = () => {
    const [tasks, setTasks] = useState<TaskItem[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    console.log(tasks);

    return (
        <div className="App">
            <NewTaskForm setTasks={setTasks}/>
            <TaskList tasks={tasks}/>
        </div>
    );
};

export default App;
