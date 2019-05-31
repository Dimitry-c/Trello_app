import React from "react";
import "../App.css";

const AddList = (props) => {

    let {handleClick} = props;
    return (
        <input type="button" onClick={()=>handleClick(false)} className="add-list-btn" value="Add a list..."/>
    )
}

export default AddList;