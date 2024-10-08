// service isfor making https request and sending data back and forth

import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  //   POST REQUEST SE RETURN
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  console.log("HEREEEEE", response.data)
  if(response.data){
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data
}

const logout =  () => {
  localStorage.removeItem("user")
} 

const authService = {
  register,
  logout,
  login
};

export default authService;
