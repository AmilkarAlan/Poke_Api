import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemonData, fetchPokemonList, searchByInput, searching } from "../hooks/fetchData";

const initialState = {
    pokedex: [],
    pokemon: null,
    pokeExtra: null,
    status: 'idle', // idle | loading | succeeded | failed 
    error: null,
    limit: 20,
    offset: 0,
    cache: {},

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

export const fetchExtraInfo = createAsyncThunk(
    'pokemons/fetchExtraInfo',
    async (URL) => {
        const response = await fetchPokemonData(URL);
        return response;
    }
);

export const getPokemon = createAsyncThunk(
    'pokemons/getPokemon',
    async (input, { getState }) => {
        const { pokemons } = getState();
        const { pokedex } = pokemons;

        const foundPokemon = pokedex.find(pokemon =>
            pokemon.name === input || pokemon.id === input
        );
        if (foundPokemon) {
            return foundPokemon;
        }
        const response = await searchByInput(input)
        return response
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
        },
        selectPokemon: (state, action) => {
            state.pokemon = action.payload
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
            .addCase(fetchExtraInfo.fulfilled, (state, action) => {
                state.pokeExtra = action.payload
            })
            .addCase(getPokemon.fulfilled, (state, action) => {
                state.pokemon = action.payload
            })

    },
});

export const { nextPage, previousPage, selectPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
