import { createApi } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../api/axiosInstance';
import { AddItemDto } from './dto/AddItemDto';
import { UpdateItemDto } from './dto/UpdateItemDto';
import { RemoveItemDto } from './dto/RemoveItemDto';
import { CartItem } from './cartSlice';
import axios from 'axios';

// Typowanie zapytania
interface AxiosQueryArgs {
  url: string;
  method: string;
  body?: unknown;
}

// Funkcja pomocnicza bazująca na instancji axios
const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ url, method, body }: AxiosQueryArgs) => {
    try {
      const response = await axiosInstance({
        url: `${baseUrl}/${url}`,
        method,
        data: body,
      });
      return { data: response.data }; // zwrócenie danych z odpowiedzi
    } catch (error: unknown) {
      // Obsługa błędów
      if (axios.isAxiosError(error)) {
        return {
          error: {
            status: error.response?.status,
            data: error.response?.data,
          },
        };
      } else {
        // Obsługa innych błędów, które mogą nie być związane z Axios
        return {
          error: {
            status: 500,
            data: 'Unknown error occurred',
          },
        };
      }
    }
  };

// Tworzenie API z użyciem createApi
export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }), // Base URL jest już w instancji axios
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => ({
        url: 'get', // W tym przypadku zwracamy obiekt zawierający URL
        method: 'GET', // Określamy metodę HTTP
      }),
    }),
    addItem: builder.mutation<void, AddItemDto>({
      query: (item) => ({
        url: '/cart/add',
        method: 'POST',
        body: item,
      }),
    }),
    updateItem: builder.mutation<void, UpdateItemDto>({
      query: (item) => ({
        url: `update/${item.productId}`,
        method: 'PUT',
        body: item,
      }),
    }),
    removeItem: builder.mutation<void, RemoveItemDto>({
      query: (item) => ({
        url: `remove/${item.productId}`,
        method: 'DELETE',
      }),
    }),
    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: 'clear',
        method: 'DELETE',
      }),
    }),
  }),
});

// Eksportowanie hooków do użycia w komponentach
export const { useGetCartQuery, useAddItemMutation, useUpdateItemMutation, useRemoveItemMutation, useClearCartMutation } = cartApi;
