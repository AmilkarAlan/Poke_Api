import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemonData, fetchPokemonList, fetchTypes, searching, } from "../hooks/fetchData";

const initialState = {
    pokedex: [],
    pokemon: {},
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    searchResult: null, // Para almacenar el resultado de la búsqueda
    limit: 20,
    offset: 0,
    cache: {}
}

// Acción asíncrona para obtener la lista de pokémon
export const fetchPokedex = createAsyncThunk(
    'pokemons/fetchPokedex',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().pokemons; // Acceder al estado global
        const { offset, limit, cache } = state; // Obtener el cache, offset y limit

        // Verificar si ya tenemos la página en el cache
        if (cache[ offset ]) {
            console.log(cache[ offset ]);

            return { data: cache[ offset ] }; // Si ya tenemos los datos de esta página, los devolvemos directamente
        }

        // Si no tenemos los datos, hacemos la solicitud
        const response = await fetchPokemonList(limit, offset);
        const detailedPokemonList = await Promise.all(
            response.results.map(pokemon => fetchPokemonData(pokemon.url))
        );

        return { offset, data: detailedPokemonList }; // Retornamos el offset actual y los datos
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
                const { offset, data } = action.payload
                state.status = 'succeeded';
                state.pokedex = data;
                state.cache[ offset ] = data;
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
