import React, {useState} from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';

function ToDoItem(props) {

    const [editMode, setEditMode] = useState(false);
    const [editTaskTitle, setEditTaskTitle] = useState(props.name);
    const [editTaskDesc, setEditTaskDesc] = useState(props.description);

    const taskEditSave = () => {
        props.taskEditSave(props.id, editTaskTitle, editTaskDesc);
        setEditMode(false);

    }

    const editModeCancel = () => {
        setEditTaskTitle(props.name);
        setEditTaskDesc(props.description);
        setEditMode(false);
    }

    return (
        <div className="input-group">
            {editMode
                ? <>
                    <input type="text" value={editTaskTitle} onChange={e => setEditTaskTitle(e.target.value)}/>
                    <input type="text" value={editTaskDesc} onChange={e => setEditTaskDesc(e.target.value)}/>
                    <button onClick={taskEditSave}>Save</button>
                    <button onClick={editModeCancel}>Cancel</button>
                </>
                : <span>{props.name}</span>
            }
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={() => props.taskStateChange(props.id)}>{props.done ? 'DONE' : 'TODO'}</button>
            <button onClick={() => props.taskDelete(props.id)}>DELETE</button>
            <button onClick={() => props.onTaskMove(props.id, 'up')}>UP</button>
            <button onClick={() => props.onTaskMove(props.id, 'down')}>DOWN</button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    taskDelete: (id) => dispatch({type: 'TASK_DELETE', payload: id}),
    taskStateChange: (id) => dispatch({type: 'TASK_STATE_CHG', payload: id}),
    taskEditSave: (id, newName, newDesc) => dispatch({type: 'TASK_EDIT', payload: {id, newName, newDesc}}),
    onTaskMove: (id, direction) => dispatch({type: 'TASK_PRIORITY_CHG', payload: {id, direction}})
})


export default connect(null, mapDispatchToProps)(ToDoItem);
