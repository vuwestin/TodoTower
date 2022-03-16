import React from "react";
import './styles/Modal.css'
import './styles/Buttons.css'
import './styles/Taskblock.css'
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { stringify } from "uuid";

function TaskCreateModal(props) {
    const [taskName, setTaskName] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [taskPriority, setTaskPriority] = useState("Med");

    function handleCreateButton(e) {
        let task = {
            "id": uuidv4(),
            "taskName": taskName,
            "taskDescription": taskDescription,
            "colNum": props.createCol,
            "priority": taskPriority
        };
        props.createTask( task );
        props.closeModal( false );
    }

    return ( 
        <div className="modalBackground">
            <div className="modalContainer">
                <button className="xButton" onClick={() => props.closeModal(false)}> X </button>
                <div className="title">
                    <h1>Create Task</h1>
                </div>
                <div className="modalBody">
                    Task Name
                    <br></br>
                    <input type="text" onChange={event => setTaskName(event.target.value)}/>
                    <br></br>
                    Task Description
                    <textarea rows="4" cols="50" onChange={event => setTaskDescription(event.target.value)}/>
                    Priority: {taskPriority}
                    <div>
                        <button className="Low" onClick={() => setTaskPriority("Low")}>
                            Low
                        </button>
                        <button className="Med" onClick={() => setTaskPriority("Med")}>
                            Med
                        </button>
                        <button className="High" onClick={() => setTaskPriority("High")}>
                            High
                        </button>
                    </div>
                    <button onClick={handleCreateButton} className="greenButton">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default TaskCreateModal;