import axios from "axios";

const url = "http://localhost:8000";
export const addUser = async (data) => {
  try {
    await axios.post(`${url}/add`, data);
    // const response = await fetch(`${url}/add`,{
    //     method:"POST",
    //     headers:{'Content-Type':'application/json'},
    //     body:JSON.stringify(data),
    // })
  } catch (error) {
    console.log("Error in Adding User", error.message);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${url}/users`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error while getting all users", error.message);
  }
};

export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log("error while Calling SetConversation", error.message);
  }
};

export const getConversation = async (data) => {
  try {
    let response = await axios.post(`${url}/conversation/get`, data);
    return response.data;
  } catch (error) {
    console.log("error while Calling GetConversation", error.message);
  }
};

export const newMessage = async (data) => {
  try {
    await axios.post(`${url}/message/add`, data);
  } catch (error) {
    console.log("error while Calling NewMessage", error.message);
  }
};

export const getMessages = async (id) => {
  try {
    let response = await axios.get(`${url}/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log("error while Calling getMessages", error.message);
  }
};

export const UploadFile = async (data) => {
  try {
    return axios.post(`${url}/file/upload`, data);
  } catch (error) {
    console.log("error while Calling UploadFile", error.message);
  }
};
