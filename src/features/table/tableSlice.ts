import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchTable, fetchTableAvailable } from './tableAPI';

export interface TableProps {
    id: number;
    floor: number;
    status: number;
}

export interface TableState {
    value: Array<TableProps>;
    available: Array<TableProps>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TableState = {
    value: [],
    available: [],
    status: 'idle',
};

export const fetchTableAsync = createAsyncThunk('floor/fetchTable', async (id: number) => {
    const response = await fetchTable(id);
    return response.data;
});

export const fetchTableAvailableAsync = createAsyncThunk('floor/fetchTableAvailable', async () => {
    const response = await fetchTableAvailable();
    return response.data;
});

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        removeTable: (state, { payload }: PayloadAction<number>) => {
            const removeTable = state.available.find((item: TableProps) => item.id === payload) as TableProps;
            const index = state.available.indexOf(removeTable);
            state.available.splice(index, 1);
        },
    },
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
            })
            .addCase(fetchTableAvailableAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.available = action.payload.data;
            });
    },
});
export const { removeTable } = tableSlice.actions;

export const getTables = (state: RootState) => state.table.value;
export const getTablesAvailable = (state: RootState) => state.table.available;

export default tableSlice.reducer;
