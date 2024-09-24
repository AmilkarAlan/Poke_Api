import { configureStore } from '@reduxjs/toolkit'
import pokemonSlice from './pokemonSlice'
import typesSlice from './typesSlice'
import searchSlice from './searchSlice'

export const store = configureStore({
  reducer: {
    pokemons:pokemonSlice,
    types: typesSlice,
    search: searchSlice
},
})