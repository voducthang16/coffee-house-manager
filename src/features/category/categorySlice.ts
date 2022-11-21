import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCategory } from './categoryAPI';

export interface CategoryProps {
    id: string;
    name: string;
    slug: string;
    status: number;
    _order: number;
}

export interface CategoryState {
    value: Array<CategoryProps>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CategoryState = {
    value: [],
    status: 'idle',
};

export const fetchCategoryAsync = createAsyncThunk('category/fetchCategory', async () => {
    const response = await fetchCategory();
    return response.data;
});

export const categorySlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.data;
            })
            .addCase(fetchCategoryAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

// export const { increment, decrement, incrementByAmount } = categorySlice.actions;

export const getCategory = (state: RootState) => state.category.value;

export default categorySlice.reducer;
