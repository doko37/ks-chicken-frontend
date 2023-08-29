import axios from 'axios'

export default axios.create({
    baseURL: 'http://13.239.34.193:3001/api'
    //baseURL: 'http://localhost:3001/api'
})