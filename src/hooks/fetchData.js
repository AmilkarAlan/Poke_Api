import axios from "axios";
const URL = "https://pokeapi.co/api/v2/pokemon"

export const fetchPokemonList = async (limit, offset) => {
    try {
        const { data } = await axios.get(`${URL}?offset=${offset}&limit=${limit}`)

        return data
    } catch (error) {
        return error
    }
}

export const fetchPokemonData = async (URL) => {
    try {
        const { data } = await axios.get(`${URL}`)
        return data
    } catch (error) {
        return error
    }
}

export const searching = async (URL,{ name }) => {
    try {
        const endpoint = name ? `${URL}/${name}` : `${URL}`;
        const { data } = await axios.get(endpoint);
        console.log(endpoint);
        
        return data
    } catch (error) {
        throw new Error(error);
    }
}

export const searchByInput = async (input) => {
    try {
        
        const { data } = await axios.get(`${URL}/${input}`);
        return data
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchTypes = async (URL) => {
    try {
        const response = await axios.get(`${URL}`)

        return response
    } catch (error) {
        return error
    }
}