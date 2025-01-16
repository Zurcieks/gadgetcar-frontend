"use client";
import React, { useState } from "react";
import axiosInstance from "../../../../../utils/api/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation"; // Usunięto 'useParams'
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Pobieramy token z query string

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Wywołanie preventDefault()

    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Hasła muszą być takie same.");
      return;
    }

    try {
      if (!token) {
        setError("Brak tokenu. Spróbuj ponownie.");
        return;
      }

      // Wysyłanie żądania z tokenem i nowym hasłem
      const response = await axiosInstance.post(`/auth/reset-password`, {
        token,
        newPassword, // Używamy nowego hasła (backend oczekuje newPassword)
      });

      // Zakładając, że backend wysyła komunikat
      if (response.data) {
        setMessage(
          "Hasło zostało zmienione. Za chwilę zostaniesz przekierowany do strony logowania."
        );

        // Automatyczne przekierowanie po 3 sekundach
        setTimeout(() => {
          router.push("/auth/sign-in"); // Przekierowanie na stronę logowania
        }, 3000);
      }
    } catch (error) {
      console.log("Wystąpił błąd. Spróbuj ponownie", error);
      setMessage("Wystąpił błąd. Spróbuj ponownie później.");
    }
  };

  return (
    <div className="flex justify-center items-center md:h-screen bg-blue-50 ">
      <div className="max-w-md w-full h-[90vh] md:h-[50vh] flex justify-center flex-col bg-white shadow-2xl rounded-lg px-8">
        <div className="flex flex-col justify-center mr-10 items-center mb-5">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="object-contain "
            />
          </Link>
        </div>

        <div className="flex flex-col -mt-20">
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Podaj hasło
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Wpisz nowe hasło"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Podaj hasło
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confi	rmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Potwierdź nowe hasło"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Zmień hasło
            </button>
          </form>

          {error && (
            <div className="mt-4 text-center text-red-500">
              <p>{error}</p>
            </div>
          )}

          {message && (
            <div className="mt-4 text-center text-green-500">
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
