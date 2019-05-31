import React, { useState, useEffect } from "react";


const AppContext = React.createContext();
const { Provider } = AppContext;


const AppProvider = ({ children }) => {
    const [boardsList, set_BoardsList] = useState(JSON.parse(localStorage.getItem("boards_list")) || []);

    useEffect(() => {
        localStorage.setItem("boards_list", JSON.stringify(boardsList));
    }, [boardsList])

    // state = values to display
    const state = {
        boardsList
    };
    // actions = callbacks to invoke
    const actions = {
        set_BoardsList
    };

    return <Provider value={{ ...state, ...actions }}> {children} </Provider>;
};

export { AppProvider, AppContext };
