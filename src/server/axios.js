import axios from 'axios'
const instance = axios.create({
    headers: { 'Content-Type': 'application/json' },
    baseURL: `https://candidate.neversitup.com/todo`
})
export default instance