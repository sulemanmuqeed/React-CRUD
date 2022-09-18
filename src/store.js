import { configureStore } from '@reduxjs/toolkit'
import seashellReducer from './features/seashell/seashellSlice'

export const store = configureStore({
  reducer: {
    seashell: seashellReducer
  },
})