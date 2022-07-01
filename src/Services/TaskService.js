import axios from "axios";

const baseUrl = 'http://localhost:8090/AGoalsAppBackEnd/';

export const createTaskForGoalId = async (userData) => {
    let response = await axios.post(`${baseUrl}goal/tasks/`, userData);
    return responseHandler(response);
}

export const updateTaskForGoalId = async (task_id, userData) => {
    let response = await axios.patch(`${baseUrl}goal/tasks/${task_id}`, userData);
    return responseHandler(response);
}

export const deleteTaskBylId = async (task_id, userData) => {
    let response = await axios.delete(`${baseUrl}goal/tasks/${task_id}`,
        {
            Authorization: userData.token,
            data: {userData}
        }
        );
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