import React, { useEffect } from "react";
import Taskblock from "./Taskblock";
import BlankBlock from "./BlankBlock";
import TaskViewModal from './TaskViewModal.js';
import TaskCreateModal from "./TaskCreateModal";
import './styles/Board.css'
import './styles/Buttons.css'
import { useState } from "react";
import { writeToDb, readFromDb, deleteFromDb, auth, provider } from '../firebaseWrapper.js'
import { signOut } from "firebase/auth";

function Board(props) {
    console.log("board gets rendered");
    const [tasks,  setTasks] = useState([]);
    const [openTaskViewModal, setOpenTaskViewModal] = useState(false);
    const [openTaskCreateModal, setOpenTaskCreateModal] = useState(false);
    const [lastClickedBlankBlockCol, setlastClickedBlankBlockCol] = useState(0);
    const [lastClickedTaskBlockTask, setLastClickedTaskBlockTask] = useState({});
    const NUM_ROWS = 7;
    const NUM_COLS = 5;

    useEffect( () => {
        readFromDb( '/tasks', props.userInfo.uid, (snapshot) => {
            let taskList = []
            for( let task in snapshot ) {
                taskList.push( snapshot[task] );
            }
            setTasks(taskList);
        })
    }, [] );

    function handleSignOut() {
        signOut(auth).then(() => {
            console.log("signed out");
            props.logout({
                "uid": "",
                "displayName": "",
                "isSignedIn": false
            });
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    function setTaskModalInformation( taskId ) {
        for( let task of tasks ) {
            if( task.id === taskId ) {
                setLastClickedTaskBlockTask( task );
            }
        }
    }

    let symbolGrid = [];
    let grid = [];

    for( let i = 1; i <= NUM_ROWS; i++ ) {
        for( let j = 1; j <= NUM_COLS; j++ ) {
            symbolGrid.push(0);
            grid.push( <BlankBlock rowNum={i} colNum={j} openModal={setOpenTaskCreateModal} setLastClicked={setlastClickedBlankBlockCol} /> );
        }
    }

    function handleClick(e) {
        // console.log( 'X location', e.clientX);
        // console.log( 'Y location', e.clientY);
    }

    function handleSignOut() {
        props.logout( {
            "isSignedIn": false,
            "uid": "",
            "displayName": ""
        });
    }

    function updateTasks() {
        for( let task of tasks ) {
            symbolGrid[ ( (task.rowNum ) * NUM_COLS ) + (task.colNum) - 1 ] = 1;
            grid[ ( (task.rowNum ) * NUM_COLS ) + (task.colNum-1) ] = <Taskblock setLastClicked={setTaskModalInformation} id={task.id} prio={task.priority} taskName={task.name} taskDescription={task.description} openModal={setOpenTaskViewModal} rowNum={task.rowNum+1} colNum={task.colNum+1} />
        }
    }

    function addTask( task ) {
        let rowNum = NUM_ROWS-1;
        let i;
        for( i = task.colNum - 1 + ( NUM_COLS * ( NUM_ROWS - 1 ) ); i > 0; i -= NUM_COLS ) {
            if( symbolGrid[i] == 0 ) {
                break;
            }
            rowNum--;
        }
        symbolGrid[i] = 1;
        let updatedTask = { ...task, "rowNum": rowNum }
        setTasks( prevTasks => [...prevTasks, updatedTask] );
        writeToDb('tasks/' + updatedTask.id, props.userInfo.uid, updatedTask)
        updateTasks();
    }

    function deleteTask( taskId ) {
        let newTasks = [...tasks];
        let shiftCol;
        let shiftRow;
        for( let i = 0; i < newTasks.length; i++ ) {
            if( newTasks[i].id == taskId ) {
                shiftCol = newTasks[i].colNum;
                shiftRow = newTasks[i].rowNum;
                symbolGrid[ ( (newTasks[i].rowNum ) * NUM_COLS ) + (newTasks[i].colNum-1) ] = 0;
                grid[ ( (newTasks[i].rowNum ) * NUM_COLS ) + (newTasks[i].colNum-1) ] = <BlankBlock rowNum={i} colNum={newTasks[i].colNum} openModal={setOpenTaskCreateModal} setLastClicked={setlastClickedBlankBlockCol} />;
                newTasks.splice( i, 1 );
                deleteFromDb( '/tasks/' + taskId, props.userInfo.uid );
            }
        }
        for( let task of newTasks ) {
            console.log("task coords: " + task.rowNum + ", " + task.colNum )
            console.log( task.colNum == shiftCol );
            console.log( task.rowNum > shiftRow );
            if( task.colNum == shiftCol && task.rowNum < shiftRow ) {
                console.log("proc");
                task.rowNum = task.rowNum + 1;
                //write to db to update task
                writeToDb('tasks/' + task.id, props.userInfo.uid, task );
            }
        }

        setTasks( newTasks );
        
        updateTasks();
    }

    updateTasks()
    console.log(props.userInfo);
                
    return  (   
                <div>
                    {props.userInfo.displayName}'s Board
                    <button className="redButton" onClick={handleSignOut}>Logout</button>
                    <div className="wrapper" onClick={handleClick}>
                    {grid}
                    { openTaskViewModal && <TaskViewModal delete={deleteTask} task={lastClickedTaskBlockTask} closeModal={setOpenTaskViewModal} />}
                    { openTaskCreateModal && <TaskCreateModal closeModal={setOpenTaskCreateModal} createTask={addTask} createCol={lastClickedBlankBlockCol} />}
                    </div>
                </div>
            );
}

export default Board;
