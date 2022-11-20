import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { insertProductToOrder } from './orderAPI';

export interface OrderProps {
    id: string;
    name: string;
    image: string;
    price: number;
    status: number;
    quantity?: number;
}

export interface OrderState {
    value: Array<OrderProps>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: OrderState = {
    value: [],
    status: 'idle',
};

export const insertProductAsync = createAsyncThunk('product/insertProduct', async (item: any) => {
    const response = await insertProductToOrder(item);
    return response.data;
});

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        insert: (state, { payload }: PayloadAction<OrderProps>) => {
            state.value.push(payload);
        },
        update: (state, { payload }: PayloadAction<OrderProps>) => {
            const newArray = state.value.map((item: OrderProps) => (item.id === payload.id ? payload : item));
            state.value = newArray;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(insertProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = [];
            })
            .addCase(insertProductAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { insert, update } = orderSlice.actions;

export const getProductsOrder = (state: RootState) => state.order.value;

export default orderSlice.reducer;
