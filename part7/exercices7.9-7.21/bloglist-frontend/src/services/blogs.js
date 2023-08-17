import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};
const getAll = () => {
    let config = {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        }
    };

    const request = axios.get(baseUrl, config);
    return request.then((response) => response.data);
};

const create = async (newObject) => {
    let config = {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = (id, newObject) => {
    let config = {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        }
    };
    const request = axios.put(`${baseUrl}/${id}`, newObject, config);
    return request.then((response) => response.data);
};

const deleteBlog = (id) => {
    let config = {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        }
    };

    const request = axios.delete(`${baseUrl}/${id}`, config);
    return request.then((response) => response.data);
};
const getComment = (id) => {
    let config = {
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        }
    };

    const request = axios.get(`${baseUrl}/${id}/comment`, config);
    return request.then((response) => response);
}

const addComment = (id, comment) => {
    return axios({
        method: 'post',
        url: `/api/blogs/${id}/comment`,
        data: { comment: comment },
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => res).catch(err => err)
}

export default { getAll, create, update, setToken, deleteBlog, getComment, addComment };
