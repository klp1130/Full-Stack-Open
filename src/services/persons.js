import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

/// "Resources are fetched from the served with HTTP GET requests. URL notes/3 will return the note that has the id number 3. A get request to the notes URL would return a list of all notes."
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

/// "Creating a new resources for storing a note is done by making an HTTP POST request to the notes URL"
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

/// "The new note is then sent with a PUT request to the backend where it will replace the old object."
const update = (id, updatedObject) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedObject)
    return request.then(response => response.data)
}


export default { getAll , create , deletePerson , update }