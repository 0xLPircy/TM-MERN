import axios from "axios";

const API_URL = "/api/goals/";

const addGoal = async(goalData, token) => {
    // a var to store the headers, here suth header needed since route protected
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, goalData, config);
    return response.data
}

const getGoals = async(token) => {
       // a var to store the headers, here suth header needed since route protected
       const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } 
    const response = await axios.get(API_URL, config);
    return response.data
}

const goalService = {
    addGoal,
    getGoals
}
export default goalService;