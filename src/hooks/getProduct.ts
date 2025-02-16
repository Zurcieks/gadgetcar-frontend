 
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Product } from "../../types/product.types";
 

export function getProducts() {
    const [products, setProducts] = useState<Product[]>([]);
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

    return { products, isLoading, error };
}