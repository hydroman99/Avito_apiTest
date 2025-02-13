const axios = require('axios')  

const URL = 'https://qa-internship.avito.com'

const getItem = async (id) => {
    const response = await axios.get(`${URL}/api/1/item/${id}`)  
    return response
}

const getItemStats = async (id) => {
    const response = await axios.get(`${URL}/api/1/statistic/${id}`)  
    return response
}

const getItemStatsBySellerId = async (id) => {
    const response = await axios.get(`${URL}/api/1/${id}/item`)  
    return response
}
const createItem = async (item) => {
    const response = await axios.post(`${URL}/api/1/item`, item)
    return response
}
module.exports = { getItem, getItemStats, getItemStatsBySellerId, createItem }