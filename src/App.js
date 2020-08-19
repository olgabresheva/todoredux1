import React from 'react';
import './Main.css';
import ToDoCreateForm from "./ToDoCreateForm";
import ToDoList from "./ToDoList";

function App() {

    return (
        <div className="container">
            <ToDoCreateForm/>
            <hr/>
            <ToDoList/>
        </div>
    );
}

export default App;
