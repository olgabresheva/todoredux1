import React, {useState} from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from 'react-redux';


function ToDoCreateForm(props) {

    const [taskNameInput, setTaskNameInput] = useState('')
    const [taskDescriptionInput, setTaskDescriptionInput] = useState('')
    const [addTaskDisabled, setAddTaskDisabled] = useState(true);

    const newTaskDescriptionInput = (e) => {
        setTaskDescriptionInput(e.target.value);
        (taskDescriptionInput.length > 3) ? setAddTaskDisabled(false) : setAddTaskDisabled(true);
    }

    const addNewTask = (e) => {
        props.addNewTask(taskNameInput, taskDescriptionInput);
        setTaskNameInput('');
        setTaskDescriptionInput('')
        e.preventDefault();
        setAddTaskDisabled(true)
    }


    return (
        <div>
            <label htmlFor="exampleFormControlInput1"><strong>Your To Do List</strong></label><br/>
            <form>
            <div className="row">
                <div className="col">
                    <input className="form-control form-control-sm" placeholder="Enter Task Name" type="text"
                           value={taskNameInput} onChange={e => setTaskNameInput(e.target.value)}/>
                </div>
                <div className="col">
                    <input className="form-control form-control-sm" placeholder="Enter Task Description" type="text"
                           value={taskDescriptionInput}
                           onChange={newTaskDescriptionInput}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
            <button type="submit" className="btn btn-primary btn-sm" disabled={addTaskDisabled} onClick={addNewTask}>Add Task</button>
                </div>
            </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    addNewTask: (name, description) => dispatch({type: 'TASK_ADD', payload: {name, description}})
});

export default connect(null, mapDispatchToProps)(ToDoCreateForm);
