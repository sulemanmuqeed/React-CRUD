import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api/SeashellAPI';

export const fetchSeashells = createAsyncThunk(
    'seashell/fetchSeashells',
    async () => await API.fetchSeashells()
);

export const addSeashell = createAsyncThunk(
    'seashell/addSeashell',
    async (data) => await API.addSeashell(data)
);

export const updateSeashell = createAsyncThunk(
    'seashell/updateSeashell',
    async ({id, data}) => await API.updateSeashell(id, data)
);

export const deleteSeashell = createAsyncThunk(
    'seashell/deleteSeashell',
    async (id) => await API.deleteSeashell(id)
);
