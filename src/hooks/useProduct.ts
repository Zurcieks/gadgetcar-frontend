import { useState, useEffect } from "react";
 
import { Product } from "../../types/product.types";
import axiosInstance from "../../api/axiosInstance";
 

export function useProduct(productId: string) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get<Product>(`/products/${productId}`);
                setProduct(response.data)
            } catch (error) {
                setError(error as Error) 

            } finally{
                setIsLoading(false);
            }
        }
        if(productId) {
            fetchProduct();
        }
    }, [productId])
    return {product, isLoading, error}
}

export function GetProducts() {
    const [product, setProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get<Product[]>('/products');
                setProducts(response.data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { product, isLoading, error };
 
}