import React, {useState} from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux';


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

            <input type="text" value={taskNameInput} onChange={e => setTaskNameInput(e.target.value)}/>
            <input type="text" value={taskDescriptionInput} onChange={newTaskDescriptionInput}/>
            <button disabled={addTaskDisabled} onClick={addNewTask}>Add Task</button>

        </div>
    );
}
const mapDispatchToProps = (dispatch) => ({
    addNewTask: (name, description) => dispatch({type: 'TASK_ADD', payload: {name, description}})
});

export default connect(null, mapDispatchToProps)(ToDoCreateForm);
