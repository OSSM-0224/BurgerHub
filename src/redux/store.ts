import { configureStore } from '@reduxjs/toolkit';
import burgersReducer from './burgersSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    burgers: burgersReducer,
    cart: cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;