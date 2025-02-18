import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../../api/axiosInstance';
import { AddItemDto } from './dto/AddItemDto';
import { UpdateItemDto } from './dto/UpdateItemDto';
import { RemoveItemDto } from './dto/RemoveItemDto';
import { CartItem } from './cartSlice';
import axios from 'axios';
import { Cart } from '../../types/cart.types';

// Typowanie zapytania
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
    reducerPath: 'cartApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5000/cart'}),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
      getCart: builder.query<Cart, void>({
        query: () => ({
          url: '',  
          method: 'GET',
        }),
        providesTags: ['Cart']
      }),
      addItem: builder.mutation<Cart, AddItemDto>({
        query: (item) => ({
          url: 'add',
          method: 'POST',
          body: item,
        }),
        invalidatesTags: ['Cart']
      }),
      updateItem: builder.mutation<Cart, UpdateItemDto>({
        query: (item) => ({
          url: `update/${item.productId}`,
          method: 'PUT',
          body: item,
        }),
        invalidatesTags: ['Cart']
      }),
      removeItem: builder.mutation<void, RemoveItemDto>({
        query: (item) => ({
          url: `remove/${item.productId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cart']
      }),
      clearCart: builder.mutation<void, void>({
        query: () => ({
          url: 'clear',
          method: 'DELETE',
        }),
        invalidatesTags: ['Cart']
      }),
    }),
  });

// Eksportowanie hooków do użycia w komponentach
export const { useGetCartQuery, useAddItemMutation, useUpdateItemMutation, useRemoveItemMutation, useClearCartMutation } = cartApi;
