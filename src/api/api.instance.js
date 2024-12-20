import axios from "axios";


export const instance = axios.create({
    baseURL: "https://api.imd-ai.com/",
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        
    },

})

export const setAuthToken = (token ) => {
    if (token) {
      instance.defaults.headers['Authorization'] = token;
    } else {
      delete instance.defaults.headers['Authorization'];
    }
  };