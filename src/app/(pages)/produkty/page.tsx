"use client";
import React, { useState } from "react";
import { useProducts } from "@/hooks/useProduct";
import { useProductFilters } from "@/hooks/useProductFilters";
import ProductFilter from "@/app/components/productComponents/products-filter";
import ProductCard from "@/app/components/productComponents/product-card";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/app/components/ui/pagination";

export default function ProductsPage() {
  const { products, isLoading, error } = useProducts();
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "",
    priceRange: { min: 0, max: 1000 },
  });

 
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProducts = useProductFilters(products, filters);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (isLoading) return <div>Ładowanie...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="flex flex-col gap-10 justify-center max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold">Produkty</h1>

 
      <ProductFilter
        onSearchChange={(value) => setFilters((prev) => ({ ...prev, searchQuery: value }))}
        onCategoryChange={(category) => setFilters((prev) => ({ ...prev, category }))}
        onPriceChange={(min, max) => setFilters((prev) => ({ ...prev, priceRange: { min, max } }))}
        selectedCategory={filters.category}
        minPrice={filters.priceRange.min}
        maxPrice={filters.priceRange.max}
      />

 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

 
      {totalPages > 1 && (
        <Pagination className="cursor-pointer">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={currentPage === 1 ? "cursor-pointer opacity-50" : ""}
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className={currentPage === index + 1 ? "cursor-pointer " : ""}
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                className={currentPage === totalPages ? " cursor-pointer opacity-50" : ""}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
}
