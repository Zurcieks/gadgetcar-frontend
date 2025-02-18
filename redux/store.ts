import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { cartApi } from './cartApi';

const store = configureStore({
    reducer: {
      cart: cartReducer,
      [cartApi.reducerPath]: cartApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartApi.middleware),
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
