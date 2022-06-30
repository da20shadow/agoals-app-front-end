import axios from "axios";
import {useAuthContext} from "../Contexts/AuthContext";

const baseUrl = 'http://localhost:8090/AGoalsAppBackEnd/';

export const createGoal = async (formData) => {
    let response = await axios.post(`${baseUrl}goals`,formData);
    return responseHandler(response);
}

export const getAll = async (user_id) => {
    let response = await axios.post(`${baseUrl}user/goals`, user_id);
    return responseHandler(response);
}

export const getGoalById = async (goal_id,userData) => {
    let response = await axios.post(`${baseUrl}goals/${goal_id}`, userData);
    return responseHandler(response);
}

export const calculateRemainingDays = (due_date) => {
    due_date = new Date(due_date);
    const dateNow = new Date();
    const timeInMilliseconds = due_date.getTime() - dateNow.getTime();
    if (timeInMilliseconds < 0){
        return 'Overdue';
    }
    return Math.ceil(timeInMilliseconds / (1000 * 60 * 60 * 24));
}

export const dateFormat = (due_date) => {
    due_date = new Date(due_date);
    let month = due_date.toLocaleString('en-us', { month: 'short' });
    return ` ${month} ${due_date.getDate()}, ${due_date.getFullYear()}`;
}

export const calculateTodayTarget = (progress,remainingDays) => {
    let todayTarget = 100 - progress;
    if (remainingDays > 1){
        todayTarget = Math.round(todayTarget / remainingDays);
    }
    return todayTarget;
}

async function responseHandler(response) {
    let result = await response.data;

    if (response.status.toString().startsWith('2')) {
        return result;
    } else {
        throw result;
    }
}