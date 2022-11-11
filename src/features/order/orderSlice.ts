import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchProduct } from './orderAPI';

export interface OrderProps {
    _id: string;
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

// export const fetchProductAsync = createAsyncThunk('product/fetchProducts', async () => {
//     const response = await fetchProduct();
//     return response.data;
// });

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        insert: (state, { payload }: PayloadAction<OrderProps>) => {
            state.value.push(payload);
        },
        update: (state, { payload }: PayloadAction<OrderProps>) => {
            const newArray = state.value.map((item: OrderProps) => (item._id === payload._id ? payload : item));
            state.value = newArray;
        },
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchProductAsync.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(fetchProductAsync.fulfilled, (state, action) => {
    //             state.status = 'idle';
    //             state.value = action.payload;
    //         })
    //         .addCase(fetchProductAsync.rejected, (state) => {
    //             state.status = 'failed';
    //         });
    // },
});

export const { insert, update } = orderSlice.actions;

export const getProductsOrder = (state: RootState) => state.order.value;

// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = getProducts(getState());
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };

export default orderSlice.reducer;