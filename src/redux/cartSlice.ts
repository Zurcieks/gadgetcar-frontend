import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cartApi } from './cartApi';

export interface CartItem {
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  availability: "dostępny" | "niedostępny";
  category: "Akcesoria" | "Radia";
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(item => item.productId === action.payload.productId);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCart.matchFulfilled,
      (state, { payload }) => {
        state.items = payload.items;
      }
    );
  }
});

export const { setCartItems, addItem, updateItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
