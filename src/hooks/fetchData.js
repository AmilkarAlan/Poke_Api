import axios from "axios";

export const fetching = async (input) => {
    try {
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon")
        console.log(data);
        return data
    } catch (error) {
        return error 
    }
}