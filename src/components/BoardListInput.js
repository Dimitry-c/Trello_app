import React, { useContext } from "react";
import "../App.css";
import { AppContext } from '../components/AppProvider';
import ListItem from '../components/ListItem';
const BoardListInput = (props) => {

    const inputRef = React.createRef();

    let {
        set_BoardsList,
        boardsList
    } = useContext(AppContext);


    const allowDrop = (e) => {
        e.preventDefault();
    }

    const handleDragStart = (e) => {
        let item_id = Number(e.target.id);
        let dragged_item;


        let list = boardsList[board_id - 1].board_lists.find(y => y.list_id === list_id);
        dragged_item = list.list_items.find(x => x.item_id === item_id);


        let new_dragged_item = {};
        Object.assign(new_dragged_item, dragged_item);
        new_dragged_item.list_id = list_id;

        e.dataTransfer.setData("dragged_item", JSON.stringify(new_dragged_item));

    }

    const handleDragOver = (e) => {
        e.preventDefault();
        let dragged_item = JSON.parse(e.dataTransfer.getData("dragged_item"));


        if (dragged_item.list_id === list_id)
            return;


        let dropped_list_id = Number(e.target.closest('.list').getAttribute('data-list-id'));
        let { item_name: dropped_item_name , is_checked } = dragged_item;

        let newBoardList = [];
        Object.assign(newBoardList, boardsList);

        /* Delete item */
        handleDeleteItem(newBoardList, dragged_item.list_id, dragged_item.item_id);

        /* Add item */
        handleAddItem(newBoardList, dropped_list_id, dropped_item_name , is_checked);
        set_BoardsList([...newBoardList]);
    }

    const handleAddItem = (newBoardList, dropped_list_id, dropped_item_name , is_checked) => {
        let list = newBoardList[board_id - 1].board_lists.find(y => y.list_id === dropped_list_id);
        let item_id = getCurrentItemIDOfCurrentList(list);
        newBoardList[board_id - 1].board_lists[dropped_list_id - 1].list_items.push({ item_id,  item_name: dropped_item_name ,is_checked });
    }

    const handleDeleteItem = (newBoardList, dragged_list_id, dragged_item_id) => {

        let selectedList = newBoardList[board_id - 1].board_lists[dragged_list_id - 1];
        let newLists = selectedList.list_items.filter(x => x.item_id !== dragged_item_id);
        newBoardList[board_id - 1].board_lists[dragged_list_id - 1].list_items = newLists;
    }


    const handleOnSubmit = (e) => {
        e.preventDefault();

        let item_name = inputRef.current.value;
        if (item_name !== undefined && item_name.trim().length > 0) {


            let newBoardList = [];
            Object.assign(newBoardList, boardsList);
            let list = newBoardList[board_id - 1].board_lists.find(y => y.list_id === list_id);
            let item_id = getCurrentItemIDOfCurrentList(list);
            let item = { item_id: item_id, item_name: item_name , is_checked:false };
            list.list_items.push(item);
            inputRef.current.value = '';
            set_BoardsList([...newBoardList]);
            
        }
    }

    const handeItemClick = (item_id) => {
        
        let newBoardList = [];
        Object.assign(newBoardList, boardsList);

        let item = newBoardList[board_id - 1].board_lists[list_id - 1].list_items.find(x=> x.item_id === item_id);
        item.is_checked = !item.is_checked;
        set_BoardsList([...newBoardList]);
    }

    const getCurrentItemIDOfCurrentList = (current_list) => {
        return current_list.list_items[current_list.list_items.length - 1] !== undefined ?
            current_list.list_items[current_list.list_items.length - 1].item_id + 1 : 1;
    }


    const { list_title, list_id, list_items, board_id } = props;
    console.log(boardsList)
    return (
        <div onDrop={handleDragOver} onDragOver={allowDrop} data-list-id={list_id} className="list board-list-items-ctr">
            <h3>{list_title}</h3>
            <hr />
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <input ref={inputRef} type="text" placeholder="Item" />
            </form>
            <ul className="list-items">
                {list_items.length > 0 && list_items.map(x =>
                    <ListItem
                        handeItemClick={handeItemClick}
                        handleDragStart={handleDragStart}
                        key={x.item_id}
                        {...x} />)}
            </ul>
        </div>
    )
}

export default BoardListInput;