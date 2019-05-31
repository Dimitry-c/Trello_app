import React, { useState, useEffect, useContext } from "react";
import '../styles/createNewBoard.css';
import { withRouter} from "react-router-dom";
import {AppContext} from './AppProvider';

const BoardMainBtn = ({name , id , handleClick}) =>{
    return <div onClick={()=>handleClick(id)} className="btn board-main-btn">{name}</div>
}

const CreateNewBoard = (props) => {
const inputRef = React.createRef();

const [showForm, set_ShowForm] = useState(false);

const {
    boardsList,
    set_BoardsList
} = useContext(AppContext); 

useEffect(()=>{},[showForm]);

const validateBoardName = (e) => {
    e.preventDefault();
    let boardName = inputRef.current.value;
    if(boardName !== undefined && boardName.length > 0) {
        let boardObj =
        { 
            board_id: boardsList.length + 1,
            board_name:boardName,
            board_lists:[]
        }
        set_BoardsList([...boardsList , boardObj]);
        set_ShowForm(false);
    }
    inputRef.current.placeholder = "Choose a name common";
}



    return(
        <div className="flex">
            {!showForm ?<React.Fragment>
                <input type="button" onClick={()=> set_ShowForm(true)} className='add-board-btn' value="Create new board..."/>
            </React.Fragment>
            :
            <div className='form'>
                <div className='form-top'>
                <span onClick={()=> set_ShowForm(false)} className='x'>x</span>
                <h2 className='txt'>Creating Board</h2>
                </div>
                <form onSubmit={validateBoardName}>
                <div className='form-bottom'>
                    <div className='txt'>What we shall call the board?</div>
                    <input ref={inputRef} type='text' placeholder='Name it'/>
                    <div className='form-btns'>
                        <input type="button" onClick={()=> set_ShowForm(false)} className='cancel' value="Cancel"/>
                        <input type="submit" onClick={validateBoardName}  className='submit' value="Submit"/>
                    </div>
                </div>
                </form>
            </div>}
            <div className="main-btns-flex">
            {boardsList.length > 0 && boardsList.map(x=> <BoardMainBtn handleClick={(idParam)=>props.history.push(`/${idParam}`)} key={x.board_id} id={x.board_id} name={x.board_name}/>)}
            </div>
        </div>
    )
}

export default withRouter(CreateNewBoard);
