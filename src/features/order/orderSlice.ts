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
    discount?: Number;
    surcharge?: Number;
    tax?: Number;
    voucher?: string;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: OrderState = {
    value: [],
    discount: 0,
    surcharge: 0,
    tax: 0,
    voucher: '',
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
        discount: (state, { payload }: PayloadAction<number>) => {
            console.log('re-render');
            state.discount = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(insertProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.value;
            })
            .addCase(insertProductAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { insert, update, discount } = orderSlice.actions;

export const getProductsOrder = (state: RootState) => state.order.value;
export const getDiscount = (state: RootState) => state.order.discount;
export const getSurcharge = (state: RootState) => state.order.surcharge;
export const getTax = (state: RootState) => state.order.tax;
export const getVoucher = (state: RootState) => state.order.voucher;

// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = getProducts(getState());
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };

export default orderSlice.reducer;
