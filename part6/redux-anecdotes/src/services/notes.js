import axios from 'axios'
const getId = () => (100000 * Math.random()).toFixed(0)

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {
        content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}
const updateVote = async (id) => {
    const { data } = await axios.get(`${baseUrl}/${id}`,)
    let temp = { ...data }
    temp.votes++
    const { data: newData } = await axios.patch(`${baseUrl}/${id}`, temp)
    return newData
}
export default { getAll, createNew, updateVote }
