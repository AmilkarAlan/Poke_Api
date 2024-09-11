import axios from "axios";
const URL = "https://pokeapi.co/api/v2"
export const fetching = async (limit, offset) => {
    try {
        const {data} = await axios.get(`${URL}/pokemon?offset=${offset}&limit=${limit}`)
        
        return data
    } catch (error) {
        return error 
    }
}
export const searching = async (input) => {
    try {
        const {data} = await axios.get(`${URL}/pokemon/${input}`)

        return data
    } catch (error) {
        return error 
    }
}