import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCoupon } from './couponAPI';

export interface CouponProps {
    id: number;
    code: string;
    discount_value: number;
    min_order: number;
    discount_max: number;
    quantity: number;
    used: number;
    status: number;
}

export interface TableState {
    value: Array<CouponProps>;
    coupon_total: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TableState = {
    value: [],
    coupon_total: 0,
    status: 'idle',
};

export const fetchCouponAsync = createAsyncThunk('coupon/getList', async (number: number) => {
    const response = await fetchCoupon(number);
    return response.data;
});

export const couponSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCouponAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCouponAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload.data;
            })
            .addCase(fetchCouponAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const getCoupons = (state: RootState) => state.coupon.value;

export default couponSlice.reducer;
