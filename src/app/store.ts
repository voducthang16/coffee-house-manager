import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '~/features/product/productSlice';
import orderReducer from '~/features/order/orderSlice';
import categoryReducer from '~/features/category/categorySlice';
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        order: orderReducer,
        category: categoryReducer,
        product: productReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
