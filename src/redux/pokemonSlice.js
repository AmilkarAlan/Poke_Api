import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchPokemonInfo, fetchPokemonList, fetchTypes, searching,  } from "../hooks/fetchData";

const initialState = {
    pokedex: [],
    pokemon: {},
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    searchResult: null, // Para almacenar el resultado de la búsqueda
    limit: 20,
    offset: 0
}

// Acción asíncrona para obtener la lista de pokémon
export const fetchPokedex = createAsyncThunk(
    'pokemons/fetchPokedex',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().pokemons; // Acceder al estado global
        const response = await fetchPokemonList(state.limit, state.offset);
        const detailedPokemonList = await Promise.all(
            response.results.map(pokemon => fetchPokemonInfo(pokemon.name)) // Para cada Pokémon, obtenemos sus detalles
          );

        
        return detailedPokemonList;
    }
);

export const fetchPokeInfo = createAsyncThunk(
    'pokemons/fetchPokeInfo',
    async (nombre) => {
        const response = await fetchPokemonInfo(nombre);

        return response;
    }
);

export const fetchFilters = createAsyncThunk(
    'pokemons/fetchFilters',
    async () => {
        
        const response = await fetchTypes()
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
            .addCase(fetchPokedex.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokedex.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pokedex = action.payload;
            })
            .addCase(fetchPokedex.rejected, (state, action) => {
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
