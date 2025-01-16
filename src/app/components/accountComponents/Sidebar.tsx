"use client";
import React from "react";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      if (response.status === 200) {
        router.push("/auth/sign-in");
      }
    } catch (error) {
      console.error("Błąd podczas wylogowywania", error);
      return false;
    }
  };

  return (
    <aside className="bg-white p-6 md:col-span-1">
      <nav className="space-y-4">
        <a
          href="#details"
          className="block text-blue-600 font-medium hover:underline"
        >
          Dane osobowe
        </a>
        <a href="#address" className="block text-gray-600 hover:text-blue-600">
          Metody płatności
        </a>
        <a href="#orders" className="block text-gray-600 hover:text-blue-600">
          Zamówienia
        </a>
        <button
          onClick={handleLogout}
          className="block text-gray-600 hover:text-blue-600"
        >
          Wyloguj
        </button>
        <a href="#settings" className="block text-gray-600 hover:text-blue-600">
          Ustawienia
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
