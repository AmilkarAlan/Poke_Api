import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetching, searching } from "../hooks/fetchData";

const initialState = {
    pokemon: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    searchResult: null, // Para almacenar el resultado de la búsqueda
}

// Acción asíncrona para obtener la lista de pokémon
export const fetchPokemons = createAsyncThunk(
    'pokemons/fetchPokemons', 
    async () => {
        const response = await fetching();
        return response.results;
    }
)

// Acción asíncrona para buscar un pokémon por nombre
export const searchPokemon = createAsyncThunk(
    'pokemons/searchPokemon', 
    async (name) => {
        const response = await searching(name);
        return response;
    }
)

export const pokemonSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Casos para la acción fetchPokemons
            .addCase(fetchPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pokemon = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Casos para la acción fetchSearchPokemon
            .addCase(searchPokemon.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchPokemon.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchResult = action.payload;
            })
            .addCase(searchPokemon.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default pokemonSlice.reducer;
