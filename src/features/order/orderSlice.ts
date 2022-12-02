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
    tableId?: number;
}

export interface OrderState {
    value: Array<OrderProps>;
    temp: Array<OrderProps>;
    payment_mobile: boolean;
    tableId: number;
    type: number;
    status: 'idle' | 'loading' | 'failed';
}

// type = 0 -> tai quay, 1 -> tai ban

const initialState: OrderState = {
    value: [],
    temp: [],
    payment_mobile: false,
    tableId: 0,
    type: 0,
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
        insert_temp: (state, { payload }: PayloadAction<OrderProps>) => {
            state.temp.push(payload);
        },
        update: (state, { payload }: PayloadAction<OrderProps>) => {
            const newArray = state.value.map((item: OrderProps) => (item.id === payload.id ? payload : item));
            state.value = newArray;
        },
        update_temp: (state, { payload }: PayloadAction<OrderProps>) => {
            const newArray = state.temp.map((item: OrderProps) =>
                item.id === payload.id && item.tableId === state.tableId ? payload : item,
            );
            state.temp = newArray;
        },
        remove: (state, { payload }: PayloadAction<number>) => {
            const removeProduct = state.value.find((item: OrderProps) => item.id === payload) as OrderProps;
            const index = state.value.indexOf(removeProduct);
            state.value.splice(index, 1);
        },
        remove_temp: (state, { payload }: PayloadAction<number>) => {
            const removeProduct = state.temp.find(
                (item: OrderProps) => item.id === payload && item.tableId === state.tableId,
            ) as OrderProps;
            const index = state.temp.indexOf(removeProduct);
            state.temp.splice(index, 1);
        },
        empty: (state) => {
            state.value = [];
        },
        payment_mobile: (state) => {
            state.payment_mobile = !state.payment_mobile;
        },
        setTableId: (state, { payload }: PayloadAction<number>) => {
            state.tableId = payload;
        },
        setOrderType: (state, { payload }: PayloadAction<number>) => {
            state.value = [];
            state.type = payload;
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

export const {
    insert,
    update,
    remove,
    empty,
    payment_mobile,
    setTableId,
    setOrderType,
    insert_temp,
    update_temp,
    remove_temp,
} = orderSlice.actions;

export const getProductsOrder = (state: RootState) => state.order.value;
export const getProductsTemp = (state: RootState) => state.order.temp;
export const getPaymentMobile = (state: RootState) => state.order.payment_mobile;
export const getTableId = (state: RootState) => state.order.tableId;
export const getOrderType = (state: RootState) => state.order.type;

export default orderSlice.reducer;
