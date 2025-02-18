import { CartItem } from "../src/redux/cartSlice";

export interface Cart {
    _id: string;
    userId: string;
    name: string
    items: CartItem[];  
    totalPrice: number;
    images: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  