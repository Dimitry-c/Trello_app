import React, { useContext } from "react";
import { AppContext } from './AppProvider';
import "../App.css";

const BoardNameInput = (props) => {
    let { handleClick, board_id, handle_list } = props;
    const inputRef = React.createRef();

    const {
        boardsList,
    } = useContext(AppContext);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let title_val = inputRef.current.value;
        if (title_val !== undefined && title_val.trim().length > 0) {
            let newBoardList = [];
            Object.assign(newBoardList, boardsList);

            let board = newBoardList.find(x => x.board_id === Number(board_id));


            board.board_lists.push({
                list_id: board.board_lists.length + 1,
                list_title: title_val,
                list_items: []
            });
            inputRef.current.value = '';
            handle_list([...newBoardList]);
        }
    }

    return (
        <div className='board-list-ctr'>
            <input type="button" onClick={() => handleClick(true)} className="board-x" value="x" />
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <input ref={inputRef} type="text" placeholder="add a list" />
            </form>
            <span className="txt">Give me name!</span>
        </div>

    )
}

export default BoardNameInput;