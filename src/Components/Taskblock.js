import React from "react";
import './styles/Taskblock.css'

function Taskblock(props) {
    let styleObj = {
        'grid-row': props.rowNum,
        'grid-column': props.colNum,
    }

    function handleClick(e) {
        e.stopPropagation();
        props.setLastClicked( props.id );
        props.openModal(true);
    }

    console.log(props.prio);

    return <div style={styleObj} className={props.prio} onClick={handleClick}>
        {props.taskName}
        </div>
}

export default Taskblock;