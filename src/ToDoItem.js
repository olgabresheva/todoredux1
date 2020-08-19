import React, {useState} from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';

const deleteBtn = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
    <path
        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fillRule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>);

const doneBtn = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check-square" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    <path fillRule="evenodd"
          d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
</svg>);

const toDoBtn = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-square" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
</svg>);

const downBtn = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>);

const upBtn = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-up" fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
</svg>);

const editBtn = (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
    <path fillRule="evenodd"
          d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
</svg>);

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
                    <input type="text" className="form-control form-control-sm" value={editTaskTitle}
                           onChange={e => setEditTaskTitle(e.target.value)}/>
                    <input type="text" className="form-control form-control-sm" value={editTaskDesc}
                           onChange={e => setEditTaskDesc(e.target.value)}/>
                    <button className="btn btn-outline-success btn-sm" onClick={taskEditSave}>Save</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={editModeCancel}>Cancel</button>
                </>
                : <span
                    className={props.done ? "done form-control form-control-sm" : "form-control form-control-sm"}>
                    <strong>{props.name}:</strong> {props.description}
                </span>
            }
            <div className="input-group-append" id="button-addon">
                <button className="btn btn-outline-secondary btn-sm"
                        onClick={() => props.taskStateChange(props.id)}>{props.done ? doneBtn : toDoBtn}</button>
                <button className="btn btn-outline-secondary btn-sm"
                        onClick={() => setEditMode(true)}>{editBtn}</button>
                <button className="btn btn-outline-secondary btn-sm"
                        onClick={() => props.taskDelete(props.id)}>{deleteBtn}</button>
                <button className="btn btn-outline-secondary btn-sm"
                        onClick={() => props.onTaskMove(props.id, 'up')}>{upBtn}</button>
                <button className="btn btn-outline-secondary btn-sm"
                        onClick={() => props.onTaskMove(props.id, 'down')}>{downBtn}</button>
            </div>
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
