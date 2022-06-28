import axios from "axios";

const baseUrl = 'http://localhost:8090/AGoalsAppBackEnd/';

export const createGoal = async (formData) => {
    let response = await axios.post(`${baseUrl}goals`,formData);
    return responseHandler(response);
}

export const getAll = async (user_id) => {
    let response = await axios.post(`${baseUrl}user/goals`, user_id);
    return responseHandler(response);
}

async function responseHandler(response) {
    let result = await response.data;

    if (response.status.toString().startsWith('2')) {
        return result;
    } else {
        throw result;
    }
}