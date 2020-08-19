import React, {useState} from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';

function ToDoItem(props) {

    const [editMode, setEditMode] = useState(false);
    const [editTaskTitle, setEditTaskTitle] = useState(props.task.name);
    const [editTaskDesc, setEditTaskDesc] = useState(props.task.description);

    const taskEditSave = () => {
        props.taskEditSave(props.task.id, editTaskTitle, editTaskDesc);
        setEditMode(false);
    }

    return (
        <div className="input-group">

            <div>
                {props.task.map(el => <div key={el.id} className="list-unstyled">
                    {editMode
                        ? <>
                            <input type="text" value={editTaskTitle} onChange={e => setEditTaskTitle(e.target.value)}/>
                            <input type="text" value={editTaskDesc} onChange={e => setEditTaskDesc(e.target.value)}/>
                            <button onClick={taskEditSave}>Save</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </>
                        : <span>{el.name}</span>
                    }
                    <button onClick={() => setEditMode(true)}>Edit</button>
                    <button onClick={() => props.taskStateChange(el.id)}>{el.done ? 'DONE' : 'TODO'}</button>
                    <button onClick={() => props.taskDelete(el.id)}>DELETE</button>
                </div>)}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    task: state.tasks,
})

const mapDispatchToProps = (dispatch) => ({
    taskDelete: (id) => dispatch({type: 'TASK_DELETE', payload: id}),
    taskStateChange: (id) => dispatch({type: 'TASK_STATE_CHG', payload: id}),
    taskEditSave: (id, newName, newDesc) => dispatch({type: 'TASK_EDIT', payload: {id, newName, newDesc}})
})


export default connect(mapStateToProps, mapDispatchToProps)(ToDoItem);
