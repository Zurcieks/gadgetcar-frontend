"use client";
import React, { useState } from "react";
import { getProducts } from "@/hooks/getProduct";
import { useProductFilters } from "@/hooks/useProductFilters";
import ProductFilter from "@/app/components/productComponents/products-filter";
import ProductCard from "@/app/components/productComponents/product-card";
import Link from "next/link";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";

export default function ProductsPage() {
  // Fetch products using custom hook
  const { products, isLoading, error } = getProducts();

  // State for filter values
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "",
    priceRange: { min: 0, max: 1000 },
  });

  // Custom hook for filtering products
  const filteredProducts = useProductFilters(products, filters);

  // Handler functions for filter updates
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: { min, max } }));
  };

  if (isLoading) return <div><LoadingSpinner/></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex flex-col gap-10 justify-center max-w-6xl mx-auto p-10">
      <h1>Produkty</h1>
      <ProductFilter
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onPriceChange={handlePriceChange}
        selectedCategory={filters.category}
        minPrice={filters.priceRange.min}
        maxPrice={filters.priceRange.max}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Link key={product._id} href={`/produkty/${product._id}`} className="transition-transform duration-200 hover:scale-[1.02]">
            <ProductCard key={product._id} product={product} />
          </Link>
        ))}
      </div>
    </main>
  );
}
