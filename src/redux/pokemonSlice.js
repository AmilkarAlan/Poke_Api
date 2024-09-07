import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetching } from "../hooks/fetchData";

const initialState = {
    pokemons: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null
}

// Definimos la acción asíncrona con createAsyncThunk
export const fetchPokemons = createAsyncThunk(
    'pokemons/fetchPokemons', 
    async () => {
        const response = await fetching();
        return response.results; 
    }
)

export const pokemonSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {},
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.pokemons = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default pokemonSlice.reducer;
