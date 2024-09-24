import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searching } from "../hooks/fetchData";

const initialState = {

    status: 'idle', // searching | found | notFound
    error: null,
    searchResult: null, // Para almacenar el resultado de la búsqueda

}

export const searchPokemon = createAsyncThunk(
    'search/searchPokemon',
    async (name) => {
        const response = await searching(name);
        return response;
    }
)

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchPokemon.pending, (state) => {
                state.status = 'searching';
            })
            .addCase(searchPokemon.fulfilled, (state, action) => {
                state.status = 'found';
                state.searchResult = action.payload;
            })
            .addCase(searchPokemon.rejected, (state, action) => {
                state.status = 'notFound';
                state.error = action.error.message;
            });
    }
})


export default searchSlice.reducer;