"use client";
import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface ProductFilterProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceChange: (min: number, max: number) => void;
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
}

export default function ProductFilter(props: ProductFilterProps) {
  // Destructure props for cleaner usage
  const {
    onSearchChange,
    onCategoryChange,
    onPriceChange,
    selectedCategory,
    minPrice,
    maxPrice,
  } = props;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:w-full sm:gap-4">
      {/* Search input */}
      <Input
        placeholder="Szukaj"
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full sm:w-full"
      />
      
      {/* Category selector */}
      <Select 
        value={selectedCategory === "" ? "all" : selectedCategory} 
        onValueChange={(value) => onCategoryChange(value === "all" ? "" : value)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Kategoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Wszystkie kategorie</SelectItem>
          <SelectItem value="Akcesoria">Akcesoria</SelectItem>
          <SelectItem value="Radia">Radia</SelectItem>
        </SelectContent>
      </Select>

      {/* Price range inputs */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:w-auto">
        <Input
          type="number"
          placeholder="Min cena"
          className="w-full sm:w-24"
          value={minPrice}
          onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
        />
        <span className="sm:px-2">-</span>
        <Input
          type="number"
          placeholder="Max cena"
          className="w-full sm:w-24"
          value={maxPrice}
          onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
        />
      </div>
    </div>
  );
}
