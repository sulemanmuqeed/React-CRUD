import { createSlice } from '@reduxjs/toolkit'
import * as effects from './seashellEffects'

const initialState = {
  value: [],
  loading: {
    seashells: 'idle',
    delete: 'idle',
    submit: 'idle',
  },
}

export const seashellSlice = createSlice({
  name: 'seashell',
  initialState,
  reducers: {
    resetSubmitState: (state) => {
        state.loading.submit = 'idle';
    },
  },
  extraReducers: {
    [effects.fetchSeashells.pending]: (state) => {
        state.loading.seashells = 'pending';
    },
    [effects.fetchSeashells.fulfilled]: (state, action) => {
        state.value = action.payload;
        state.loading.seashells = 'idle';
    },
    [effects.fetchSeashells.rejected]: (state) => {
        state.loading.seashells = 'failed';
    },
    [effects.deleteSeashell.pending]: (state) => {
        state.loading.delete = 'pending';
    },
    [effects.deleteSeashell.fulfilled]: (state, action) => {
        state.value = state.value.filter(item => item.id !== action.meta.arg);
        state.loading.delete = 'idle';
    },
    [effects.deleteSeashell.rejected]: (state) => {
        state.loading.delete = 'failed';
    },
    [effects.addSeashell.pending]: (state) => {
        state.loading.submit = 'pending';
    },
    [effects.addSeashell.fulfilled]: (state, action) => {
        state.value = [...state.value, action.payload]
        state.loading.submit = 'completed';
    },
    [effects.addSeashell.rejected]: (state) => {
        state.loading.submit = 'failed';
    },
    [effects.updateSeashell.pending]: (state) => {
        state.loading.submit = 'pending';
    },
    [effects.updateSeashell.fulfilled]: (state, action) => {
        const id = action.meta.arg.id
        const items = state.value
        const itemIndex = items.findIndex(data => data.id === id)
        const updated = {
            id,
            ...action.meta.arg.data,
        }
        state.value = [...items.slice(0, itemIndex), updated, ...items.slice(itemIndex + 1)]
        state.loading.submit = 'completed';
    },
    [effects.updateSeashell.rejected]: (state) => {
        state.loading.submit = 'failed';
    },
  },
})

export const { resetSubmitState } = seashellSlice.actions

export default seashellSlice.reducer