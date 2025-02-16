"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axiosInstance from "../../../../api/axiosInstance";
import DropzoneComponent from "./Dropzone";

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    images: [] as File[],
    availability: "dostępny",
    stock_quantity: 0,
    category: "radia",
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stock_quantity" ? Number(value) : value,
    });
  };

  const handleFilesSelected = (files: File[]) => {
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert("Proszę dodać co najmniej jedno zdjęcie.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("name", formData.name);
    uploadData.append("description", formData.description);
    uploadData.append("availability", formData.availability);
    uploadData.append("price", formData.price.toString());
    uploadData.append("stock_quantity", formData.stock_quantity.toString());
    uploadData.append("category", formData.category);

    formData.images.forEach((file) => {
      uploadData.append("images", file);
    });

    try {
      setUploading(true);
      await axiosInstance.post("/products", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/admin/products");
      setUploading(false);
    } catch (error) {
      console.error("Błąd dodawania produktu:", error);
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg space-y-6"
      >
        <div>
          <label className="block mb-2 font-semibold">Nazwa</label>
          <input
            type="text"
            name="name"
            placeholder="Nazwa produktu"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Opis</label>
          <textarea
            name="description"
            placeholder="Opis produktu"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Cena</label>
          <input
            type="number"
            name="price"
            min="0"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Dostępność</label>
          <select
            name="availability"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.availability}
            onChange={handleInputChange}
            required
          >
            <option value="dostępny">Dostępny</option>
            <option value="niedostępny">Niedostępny</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Ilość w magazynie</label>
          <input
            type="number"
            name="stock_quantity"
            min="0"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.stock_quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Kategoria</label>
          <select
            name="category"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="radia">Radia</option>
            <option value="akcesoria">Akcesoria</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Zdjęcia</label>
          <DropzoneComponent onFilesSelected={handleFilesSelected} />
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        images: formData.images.filter((_, i) => i !== index),
                      })
                    }
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {uploading ? "Dodawanie..." : "Dodaj Ofertę"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
