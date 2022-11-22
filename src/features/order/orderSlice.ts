import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { createOrder, createOrderDetail } from './orderAPI';

export interface OrderProps {
    id: number;
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

export const createOrderAsync = createAsyncThunk('order/create', async (item: any) => {
    const response = await createOrder(item);
    return response.data;
});

export const createOrderDetailAsync = createAsyncThunk('order/create-detail', async (item: any) => {
    const response = await createOrderDetail(item);
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
        remove: (state, { payload }: PayloadAction<number>) => {
            const removeProduct = state.value.find((item: OrderProps) => item.id === payload) as OrderProps;
            const index = state.value.indexOf(removeProduct);
            state.value.splice(index, 1);
        },
        empty: (state) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(createOrderAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createOrderDetailAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderDetailAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(createOrderDetailAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { insert, update, remove, empty } = orderSlice.actions;

export const getProductsOrder = (state: RootState) => state.order.value;

export default orderSlice.reducer;
