import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetching, searching } from "../hooks/fetchData";

const initialState = {
    pokemon: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    searchResult: null, // Para almacenar el resultado de la búsqueda
    limit: 20,
    offset: 0
}

// Acción asíncrona para obtener la lista de pokémon
export const fetchPokemons = createAsyncThunk(
    'pokemons/fetchPokemons',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().pokemons; // Acceder al estado global
        const response = await fetching(state.limit, state.offset); // Usar limit y offset del estado
        return response.results;
    }
);

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
    reducers: {
        nextPage: (state) => {
            state.offset += state.limit; // Incrementar el offset en el valor del limit
        },
        previousPage: (state) => {
            state.offset = Math.max(state.offset - state.limit, 0); // Asegurarse de que no sea menor que 0
        }
    },
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

export const { nextPage, previousPage } = pokemonSlice.actions;
export default pokemonSlice.reducer;
