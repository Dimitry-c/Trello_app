import React, { useState, useContext, useEffect } from "react";
import "../styles/boardDetails.css";
import { AppContext } from '../components/AppProvider';
import AddList from "../components/AddList";
import BoardNameInput from '../components/BoardNameInput';
import BoardListInput from "../components/BoardListInput";

const BoardDetails = (props) => {

    const { match: { params: { id } } } = props;

    let {
        set_BoardsList,
        boardsList
    } = useContext(AppContext);

    const [showList, set_ShowList] = useState(false);

    useEffect(()=>{
        

    },[boardsList]);

    let board;
    if(boardsList !== undefined)
        board = boardsList.find(x => x.board_id === Number(id));

    return (
        <React.Fragment>
            {board && <div className="board-name">{board.board_name}</div>}
            {board && 
            <div className="board-bottom">
                {board.board_lists && board.board_lists.map(x=> 
                <BoardListInput 
                board_id={board.board_id}
                {...x}
                key={x.list_id}
                />)}
                {showList
                    ? <AddList handleClick={set_ShowList}/>
                    : <BoardNameInput 
                    handle_list={set_BoardsList} 
                    board_id={id} handleClick={set_ShowList}/>
                }
            </div>}
        </React.Fragment>
    )
}

export default BoardDetails;