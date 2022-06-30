import React, {createContext, useContext, useState} from 'react';
import * as goalService from "../Services/GoalService";

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
};

export const ContextProvider = ({children}) => {

    const [screenSize, setScreenSize] = useState(initialState);
    const [activeMenu, setActiveMenu] = useState(false);
    const [activeUserProfileMenu, setUserProfileMenu] = useState(false);
    const [goals, setGoals] = useState([]);

    const getAllGoals = async (user_id) => {
        if (goals.length === 0) {
            //TODO: Remove the console logs
            console.log('ContextProvider.js Server Request For All Goals Making Now!')
            goalService.getAll(user_id)
                .then(res => {
                    setGoals(res.goals)
                })
                .catch(err => {
                    console.log('ContextProvider getAllGoals() Fetch Error: ', err)
                })
        }
    }

    const updateAllGoals = async (user_id) => {
        goalService.getAll(user_id)
            .then(res => {
                setGoals(res.goals)
            })
            .catch(err => {
                console.log('ContextProvider getAllGoals() Fetch Error: ', err)
            })
    }

return (
    <StateContext.Provider
        value={{
            activeMenu, setActiveMenu,
            activeUserProfileMenu, setUserProfileMenu,
            screenSize, setScreenSize,
            goals, setGoals, getAllGoals,updateAllGoals
        }}
    >
        {children}
    </StateContext.Provider>
)
}

export const useStateContext = () => useContext(StateContext);