import axios from 'axios'
const baseUrl = `http://localhost:3001/persons`

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = (newObject) => {
    return axios
            .post(baseUrl, newObject)
            .then(response => response.data)
}

const update = (id, newObject) => {
    return axios    
            .put(`${baseUrl}/${id}`, newObject)
            .then(reponse => reponse.data)
}

export default {getAll, create, update}