"use client";

import { getRole } from "@/app/api/apiHelpers";
import axiosInstance from "@/app/api/axiosInstance";
import AddProduct from "@/app/components/AddProduct";
import ShowProducts from "@/app/components/ShowProducts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const router = useRouter();
  const checkRole = async () => {
    const role = await getRole();
    try {
      if (!role) {
        router.push("/");
      }
    } catch (error) {
      console.log("Błąd podczas sprawdzania roli", error);
    }
  };

  useEffect(() => {
    checkRole();
  }, []);

  const handleDeleteSelected = async (selectedProducts: string[]) => {
    try {
      await Promise.all(
        selectedProducts.map((id) => axiosInstance.delete(`/products/${id}`))
      );
      // Aktualizacja produktów po usunięciu
      console.log("Produkty zostały usunięte");
    } catch (error) {
      console.error("Błąd usuwania produktów:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <Link
          href="/admin/products/add"
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Dodaj produkt
        </Link>
        <button
          onClick={() => handleDeleteSelected(selectedProducts)} // Przekazujemy selectedProducts, w zależności od implementacji
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Usuń wybrane
        </button>
      </div>

      <section className="flex justify-center items-center text-center mt-4">
        <ShowProducts />
      </section>
    </div>
  );
};

export default page;
