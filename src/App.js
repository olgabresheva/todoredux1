import React from 'react';
import './Main.css';
import ToDoCreateForm from "./ToDoCreateForm";
import ToDoItem from "./ToDoItem";

function App() {

    return (
        <div className="container">
            <ToDoCreateForm/>
            <hr/>
            <ToDoItem/>
        </div>
    );
}

export default App;
