import React from "react";
import './styles/BlankBlock.css'

function BlankBlock(props) {
    let styleObj = {
        'grid-row': props.rowNum,
        'grid-column': props.colNum,
    }

    function handleClick(e) {
        e.stopPropagation();
        props.setLastClicked( props.colNum );
        props.openModal(true);
    }

    return <div style={styleObj} className="blank" onClick={handleClick}>
        {/* {props.rowNum}
        {props.colNum} */}
        </div>
}

export default BlankBlock;