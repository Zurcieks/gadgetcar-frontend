"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/api/axiosInstance";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  address: string;
  voivodeship: string;
  postalCode: string;
  city: string;
}

export const UserDetail: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/user/id");
        setUser(response.data);
        setFormData(response.data); // Skopiowanie danych użytkownika do formularza
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = async () => {
    try {
      if (formData) {
        await axiosInstance.patch(`/user`, formData);
        setUser(formData);
        setIsEditing(false);
        alert("Dane zaktualizowane pomyślnie!");
      }
    } catch (error) {
      console.error("Błąd podczas aktualizacji danych użytkownika:", error);
      alert("Wystąpił błąd podczas zapisywania danych.");
    }
  };

  return (
    <main className="p-6 md:col-span-3 min-h-screen overflow-y-auto">
      <section id="details" className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Twoje dane</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Imię
              </label>
              <input
                type="text"
                name="firstName"
                value={formData?.firstName || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nazwisko
              </label>
              <input
                type="text"
                name="lastName"
                value={formData?.lastName || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Data urodzenia
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData?.birthDate || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Numer telefonu
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData?.phoneNumber || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Adres email
              </label>
              <input
                type="email"
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                readOnly={!isEditing}
              />
            </div>
          </div>
        </form>
      </section>

      {/* Sekcja adresów */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Adresy</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Adres zamieszkania
              </label>
              <input
                type="text"
                name="address"
                value={formData?.address || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Kod pocztowy
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData?.postalCode || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Miasto
              </label>
              <input
                type="text"
                name="city"
                value={formData?.city || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Województwo
              </label>
              <input
                type="text"
                name="voivodeship"
                value={formData?.voivodeship || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                readOnly={!isEditing}
              />
            </div>
          </div>
        </form>
      </section>

      <button
        type="button"
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        {isEditing ? "Zapisz" : "Edytuj"}
      </button>
    </main>
  );
};

export default UserDetail;
