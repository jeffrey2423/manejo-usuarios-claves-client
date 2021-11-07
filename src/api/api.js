import axios from 'axios';
import { BASE_URL } from '../config/config'

export const requestStatus={
    success: "success",
    error:"error"
}

const methods = {
    POST: 'post'
}

async function callApi(endpoint, options = {}) {

    options.url = BASE_URL + endpoint;
    options.headers = {
        'Content-Type': 'application/json;charset=UTF-8'
    };

    const response = await axios(options);

    return response.data;
}

export const api = {
    userManagement: {
      async signUp(user){
            return await callApi('userManagement/signUp',{
                method: methods.POST,
                data: user
            });
        },
       async login(user){
            return await callApi('userManagement/login',{
                method: methods.POST,
                data: user
            });
        },
      async  updatePassword(user){
            return await callApi('userManagement/updatePassword',{
                method: methods.POST,
                data: user
            });
        }
    }
}