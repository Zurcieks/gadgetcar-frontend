import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  availability: "dostępny" | "niedostępny";
  stock_quantity: number;
  category: "Akcesoria" | "Radia";
}

const ShowProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get<Product[]>("/products");
      console.log("Pobrane produkty", response.data);

      const updatedProducts = response.data.map((product) => ({
        ...product,
        availability:
          product.stock_quantity === 0 ? "niedostępny" : product.availability,
      }));

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Błąd pobierania produktów:", error);
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredCategory.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredCategory.map((product) => product._id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedProducts.map((id) => axiosInstance.delete(`/products/${id}`))
      );
      setProducts(
        products.filter((product) => !selectedProducts.includes(product._id))
      );
      setSelectedProducts([]);
    } catch (error) {
      console.error("Błąd usuwania produktów:", error);
    }
  };

  const filteredCategory = products.filter((product) => {
    //Filter tworzy tablice zawierające produkty które spełniają dane warunki
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
      (selectedAvailability === "" ||
        product.availability.trim().toLowerCase() ===
          selectedAvailability.trim().toLowerCase()) //ToLowerCase konwertuje na małe litery żeby porównanie było nieczułe na wielkość liter
    );
  });

  return (
    <div className="h-screen w-full max-w-6xl p-8">
      <div className="flex justify-end space-x-2">
        <Link
          href="/admin/products/add"
          className="px-4 py-2 border-2 border-black bg-gray-900 text-white rounded-md"
        >
          Dodaj produkt
        </Link>
        <button
          onClick={() => handleDeleteSelected()}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Usuń wybrane
        </button>
      </div>
      <h2 className="text-3xl font-semibold mb-10 text-gray-900">
        Lista Produktów
      </h2>

      <div className="flex gap-4 mb-4 ">
        <input
          type="text"
          placeholder="Szukaj produktu..."
          className="border p-2 rounded-md w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border p-2 rounded-md w-1/3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Wszystkie kategorie</option>
          <option value="Akcesoria">Akcesoria</option>
          <option value="Radia">Radia</option>
        </select>
        <select
          className="border p-2 rounded-md w-1/3"
          value={selectedAvailability}
          onChange={(e) => setSelectedAvailability(e.target.value)}
        >
          <option value="">Wszystkie produkty</option>
          <option value="Dostępny">Dostępne</option>
          <option value="Niedostępny">Niedostępne</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left ">
                <input
                  type="checkbox"
                  checked={
                    selectedProducts.length === filteredCategory.length &&
                    filteredCategory.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3 text-left">Nazwa</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Ilość</th>
              <th className="p-3 text-left">Cena</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {filteredCategory.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleSelectProduct(product._id)}
                  />
                </td>
                <td className="p-3">
                  <Link href={`/produkty/${product._id}`}>
                    <img
                      src={
                        product.images?.[0]
                          ? `http://localhost:5000/${product.images[0]}`
                          : ""
                      }
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-md inline-block mr-2"
                    />
                    {product.name}
                  </Link>
                </td>
                <td className="p-3">
                  <span
                    className={`w-3 h-3 rounded-full inline-block mr-2 align-middle ${
                      product.availability === "dostępny"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {product.availability.charAt(0).toUpperCase() +
                    product.availability.slice(1)}
                </td>

                <td className="p-3">{product.stock_quantity}</td>
                <td className="p-3 font-bold">{product.price.toFixed(2)} zł</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowProducts;
