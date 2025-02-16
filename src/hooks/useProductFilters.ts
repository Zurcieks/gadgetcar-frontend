import { useMemo } from "react";
import { Product } from "../../types/product.types";

interface FilterOptions {
  searchQuery: string;
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
}

export const useProductFilters = (
  products: Product[] | undefined,
  filters: FilterOptions
) => {
  return useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const searchQuery = filters.searchQuery.toLowerCase();
      // Check if product name matches search query
      const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery)); // Sprawdza też opis


      // Check if product matches selected category
      const matchesCategory =
        filters.category === "" ||
        product.category.toLowerCase() === filters.category.toLowerCase();

      // Check if product price is within selected range
      const matchesPrice =
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, filters]);
};
