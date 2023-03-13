import axios from "axios";
const baseUrl = 'http://localhost:3001/api/notes';

const getAll = ()=>{
    const request = axios.get(baseUrl);
    // const nonExisting = {
    //     id: 1000,
    //     content: "This is not saved to server",
    //     important: true,
    // }
    return request.then(response => response.data);
}

const create = newObject =>{
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const update = (id, newObject)=>{
    console.log(`${baseUrl}/${id}`);
    return axios.put(`${baseUrl}/${id}`, newObject);
}

export default {getAll, create, update};