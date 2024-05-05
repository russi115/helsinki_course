import axios from "axios"

const getWeather = (capital) => {    
    const query = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_TOKEN}`)
    return query.then(response => response.data)
}

export default {getWeather}