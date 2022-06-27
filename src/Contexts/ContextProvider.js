import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
};

export const ContextProvider = ({ children }) => {

    const [screenSize,setScreenSize] = useState(initialState);
    const [activeMenu,setActiveMenu] = useState(false);
    const [activeUserProfileMenu,setUserProfileMenu] = useState(false);

    return (
        <StateContext.Provider
            value={{
                activeMenu, setActiveMenu,
                activeUserProfileMenu, setUserProfileMenu,
                screenSize,setScreenSize,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);