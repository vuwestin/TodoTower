import React from "react";
import './styles/Modal.css'

/*
    TaskViewModal should receive the following in its props
    taskSummary // name of task
    taskDescription
    taskCreationDate
    taskImportanceLevel
    taskCompletionCriteria
    taskDateCompleted
    taskNotes
*/

function TaskViewModal(props) {

    function handleCloseButton(e) {
        e.stopPropagation();
        props.closeModal(false);
    }

    function handleDeleteButton(e) {
        e.stopPropagation();
        props.delete( props.task.id );
        props.closeModal(false);
    }

    return ( 
        <div className="modalBackground">
            <div className="modalContainer">
                <button className="xButton" onClick={handleCloseButton}> X </button>
                <div className="title">
                    <h1>Task Name: <br></br> {props.task.taskName}</h1>
                </div>
                <br></br>
                <div className="modalBody">
                    Task Description: 
                    <br></br>
                    {props.task.taskDescription}
                </div>
                <button onClick={handleDeleteButton} className="redButton" > Delete </button>
                <button onClick={handleDeleteButton} className="greenButton" > Complete </button>
            </div>
        </div>
    );
}

export default TaskViewModal;