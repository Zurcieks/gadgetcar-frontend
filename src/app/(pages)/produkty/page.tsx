"use client";
import React, { useState } from "react";
import { getProducts } from "@/hooks/useProduct";
import { useProductFilters } from "@/hooks/useProductFilters";
import ProductFilter from "@/app/components/productComponents/products-filter";
import ProductCard from "@/app/components/productComponents/product-card";
import Link from "next/link";
 
export default function ProductsPage() {
 
  const { products, isLoading, error } = getProducts();
 
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "",
    priceRange: { min: 0, max: 1000 },
  });

 
  const filteredProducts = useProductFilters(products, filters);
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters((prev) => ({ ...prev, priceRange: { min, max } }));
  };

  if (isLoading) return ;
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
