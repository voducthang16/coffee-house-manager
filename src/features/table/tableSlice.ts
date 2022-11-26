import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchTable } from './tableAPI';

export interface TableProps {
    id: number;
    floor: number;
    status: number;
}

export interface TableState {
    value: Array<TableProps>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TableState = {
    value: [],
    status: 'idle',
};

export const fetchTableAsync = createAsyncThunk('floor/fetchTable', async (id: number) => {
    const response = await fetchTable(id);
    return response.data;
});

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTableAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTableAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.data;
            })
            .addCase(fetchTableAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const getTables = (state: RootState) => state.table.value;

export default tableSlice.reducer;
