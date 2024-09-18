import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemonData, fetchTypes } from "../hooks/fetchData";

const initialState = {
  types: [],
  colors: [],
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

export const fetchColors = createAsyncThunk('types/fetchColors', async () => {
  const response = await fetchPokemonData('https://pokeapi.co/api/v2/pokemon-color/');
  
  
  const colorPromises = response.results.map(color => fetchPokemonData(color.url));
  
  const colorData = await Promise.all(colorPromises);

    // Transformar los datos para que cada objeto tenga un color y los nombres de los Pokémon
    return colorData.map(colorResponse => ({
      color: colorResponse.name,  // Nombre del color (blue, red, etc.)
      pokemons: colorResponse.pokemon_species.map(species => species.name)  // Lista de nombres de Pokémon
    }));
});

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
      })
      .addCase(fetchColors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.colors = action.payload;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default typesSlice.reducer;
