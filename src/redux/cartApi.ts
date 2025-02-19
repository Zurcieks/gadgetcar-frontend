import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../../api/axiosInstance';
import { AddItemDto } from './dto/AddItemDto';
import { RemoveItemDto } from './dto/RemoveItemDto';
import axios from 'axios';
import { Cart } from '../../types/cart.types';
import { addItem, clearCart, removeItem, setCartItems } from './cartSlice';

interface AxiosQueryArgs {
  url: string;
  method: string;
  body?: unknown;
}

 
const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method, body }: AxiosQueryArgs) => {
    try {
      const response = await axiosInstance({
        url: `${baseUrl}/${url}`,
        method,
        data: body,
      });
      return { data: response.data }; 
    } catch (error: unknown) {
 
      if (axios.isAxiosError(error)) {
        return {
          error: {
            status: error.response?.status,
            data: error.response?.data,
          },
        };
      } else {
        
        return {
          error: {
            status: 500,
            data: 'Unknown error occurred',
          },
        };
      }
    }
  };

 
  export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/cart" }),
    tagTypes: ["Cart"],
    endpoints: (builder) => ({
      getCart: builder.query<Cart, void>({
        query: () => ({
          url: "",
          method: "GET",
        }),
        providesTags: ["Cart"],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setCartItems(data.items)); // Aktualizuj store po pobraniu
          } catch (error) {
            console.error("Błąd pobierania koszyka:", error);
          }
        },
      }),
      addItem: builder.mutation<Cart, AddItemDto>({
        query: (item) => ({
          url: "add",
          method: "POST",
          body: item,
        }),
        invalidatesTags: ["Cart"],
        async onQueryStarted(item, { dispatch, queryFulfilled }) {
          try {
            dispatch(addItem({
              ...item, images: [], description: "", availability: "dostępny", category: "Akcesoria",
              name: '',
              price: 0
            }));
            await queryFulfilled;
          } catch (error) {
            console.error("Błąd dodawania produktu:", error);
          }
        },
      }),
    
      removeItem: builder.mutation<void, RemoveItemDto>({
        query: (item) => ({
          url: `remove/${item.productId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Cart"],
        async onQueryStarted(item, { dispatch, queryFulfilled }) {
          try {
            dispatch(removeItem(item.productId));
            await queryFulfilled;
          } catch (error) {
            console.error("Błąd usuwania produktu:", error);
          }
        },
      }),
      clearCart: builder.mutation<void, void>({
        query: () => ({
          url: "clear",
          method: "DELETE",
        }),
        invalidatesTags: ["Cart"],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            dispatch(clearCart());
            await queryFulfilled;
          } catch (error) {
            console.error("Błąd czyszczenia koszyka:", error);
          }
        },
      }),
    }),
  });
  
  export const {
    useGetCartQuery,
    useAddItemMutation,
    useRemoveItemMutation,
    useClearCartMutation,
  } = cartApi;
