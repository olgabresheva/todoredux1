import React from 'react';
import './Main.css';
import ToDoItem from "./ToDoItem";
import {connect} from "react-redux";


function ToDoList(props) {


    return (
        <div className="ToDoList">
            <ul className="list-unstyled">
                {props.tasks.map(el => <li key={el.id}>
                    <ToDoItem name={el.name}
                              description={el.description}
                              done={el.done}
                              id={el.id}/>
                </li>)}
            </ul>
        </div>
    );
}

const mapStateToProps = state => ({
    tasks: state.tasks,
})

export default connect(mapStateToProps, null)(ToDoList);
