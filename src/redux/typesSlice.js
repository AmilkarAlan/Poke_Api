import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTypes } from "../hooks/fetchData";

const initialState = {
  types: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
}

export const fetchPokeTypes = createAsyncThunk(
  'types/fetchPokeTypes',
  async (URL) => {
    const { data } = await fetchTypes(URL);         
    return data; // Aquí retorna la información del tipo
  }
);

export const typesSlice = createSlice({
  name: "types",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokeTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokeTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // Verificar si el tipo ya existe en el estado
        const newType = action.payload;
        const exists = state.types.some(type => type.name === newType.name); // Aquí comparas por el atributo que los identifique

        if (!exists) {
          state.types.push(newType); // Solo se agrega si no existe
        }
      })
      .addCase(fetchPokeTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default typesSlice.reducer;
