import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll =(id)=> { 
    let config = {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        }
    };

    const request = axios.get(`${baseUrl}/${id}/comment`, config);
    return request.then((response) => response.data);
}


export default {getAll,setToken}