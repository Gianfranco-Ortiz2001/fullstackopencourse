import axios from "axios"
const baseUrl = 'https://api.openweathermap.org/data/2.5'
const api_key = import.meta.env.VITE_SOME_KEY

const getByName = (name, code) => {
    const request = axios.get(`${baseUrl}/weather?q=${name},${code}&APPID=${api_key}`)
    return request.then(response => response.data)
}

export default {getByName}