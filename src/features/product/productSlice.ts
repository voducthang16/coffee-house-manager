import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchProduct, fetchProductByCategory } from './productAPI';

export interface ProductProps {
    id: number;
    category_id: number;
    name: string;
    quantity: number;
    sold: number;
    description: string;
    price: number;
    image: string;
    status: number;
}

export interface ProductState {
    value: Array<ProductProps>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
    value: [],
    status: 'idle',
};

export const fetchProductAsync = createAsyncThunk('product/fetchProducts', async () => {
    const response = await fetchProduct();
    return response.data;
});

export const fetchProductByCategoryAsync = createAsyncThunk('product/fetchProductsByCategory', async (id: number) => {
    const response = await fetchProductByCategory(id);
    return response.data;
});

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.data;
            })
            .addCase(fetchProductAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchProductByCategoryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.data;
            });
    },
});

// export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const getProducts = (state: RootState) => state.product.value;

export default productSlice.reducer;
