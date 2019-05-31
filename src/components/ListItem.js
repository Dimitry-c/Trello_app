import React from "react";
import "../App.css";

const ListItem = (props) => {



    const { item_id, item_name, is_checked , handleDragStart , handeItemClick} = props;
    return (
        <li

            // draggable={true}
            // onDragStart={handleDragStart}
            // id={item_id}
            // className="item">
            // {item_name} 
        >
        <input 

        id={item_id}
        className={`item ${is_checked ? 'checked' : ''}`} type="button"
        value={item_name}
        draggable={true}
        onDragStart={handleDragStart}
        onClick={()=> handeItemClick(item_id)}
        />
        </li>
    )
}


export default ListItem;