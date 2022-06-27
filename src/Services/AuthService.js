import axios from "axios";

const baseUrl = 'http://localhost:8090/AGoalsAppBackEnd/';

export const login = async (formData) => {
    let response = await axios.post(`${baseUrl}users`,formData);
    let result = await response.data;

    if (response.status === 200){
        return result;
    } else {
        throw result;
    }
}

export const logout = () => {
    //TODO: clear localstorage
}

export const register = async (formData) => {
    let response = await axios.post(`${baseUrl}users`,formData);
    let result = await response.data;

    if (response.status === 201){
        return result;
    } else {
        throw result;
    }
}

export const createGoal = async (formData) => {
    let response = await axios.post(`${baseUrl}goals`,formData);
    let result = await response.data;

    if (response.status === 201){
        return result;
    } else {
        throw result;
    }
}