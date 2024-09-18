import { configureStore } from '@reduxjs/toolkit'
import pokemonSlice from './pokemonSlice'
import typesSlice from './typesSlice'

export const store = configureStore({
  reducer: {
    pokemons:pokemonSlice,
    types: typesSlice
},
})