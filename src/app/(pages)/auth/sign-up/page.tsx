"use client";
import React, { useState } from "react";
import { FaGoogle, FaGithub, FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import axiosInstance from "../../../../../utils/api/axiosInstance";

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  // Validate form fields
  const validateForm = (firstName: string, lastName: string, email: string, password: string) => {
    let formErrors: { [key: string]: string } = {};

    // Check if all fields are filled
    if (!firstName) formErrors.firstName = "Imię jest wymagane.";
    if (!lastName) formErrors.lastName = "Nazwisko jest wymagane.";
    if (!email) {
      formErrors.email = "Adres email jest wymagany.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Nieprawidłowy format adresu email.";
    }
    if (!password) {
      formErrors.password = "Hasło jest wymagane.";
    } else if (password.length < 6) {
      formErrors.password = "Hasło musi mieć co najmniej 6 znaków.";
    }

    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setErrors({});

    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate form fields
    const formErrors = validateForm(firstName, lastName, email, password);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set validation errors
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("Rejestracja zakończona: ", response.status, response.data);

      if (response.status === 201) {
        setMessage("Na Twój email został wysłany link weryfikacyjny.");
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 5000);
      }
    } catch (error: any) {
      console.error("Błąd rejestracji: ", error.response?.data);
      if (error.response?.status === 400) {
        setMessage("Użytkownik o tym adresie email już istnieje.");
      } else {
        setMessage("Wystąpił błąd podczas rejestracji.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[70vh] mt-36 w-full flex items-center justify-center bg-white px-4 py-6 sm:px-8 lg:px-12">
      <div className="w-full max-w-7xl flex flex-col-reverse md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
            Zarejestruj się
          </h2>
          <p className="text-md text-gray-600 text-center mt-2 mb-6">
            Masz już konto?{" "}
            <Link href="/auth/sign-in" className="text-blue-500 hover:underline">
              Zaloguj się
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2" htmlFor="firstName">
                Imię
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-base`}
                placeholder="Imię"
                required
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2" htmlFor="lastName">
                Nazwisko
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-base`}
                placeholder="Nazwisko"
                required
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2" htmlFor="email">
                Adres email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-base`}
                placeholder="Podaj swój adres email"
                required
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2" htmlFor="password">
                Hasło
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-base`}
                placeholder="Podaj hasło"
                required
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-4 px-2 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center disabled:bg-blue-300 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Zarejestruj się"
              )}
              {isLoading ? "Rejestracja..." : ""}
            </button>
          </form>
          {message && (
            <div className="mt-4 text-center text-lg text-green-600">
              {message}
            </div>
          )}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Lub kontynuuj</p>
            <div className="flex justify-center mt-4">
              <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg mx-2 transition-all duration-300 text-base">
                <FaGoogle className="mr-2" /> Google
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 h-[300px] md:h-auto relative hidden md:block">
          <Image
            src="/radio.jpeg"
            alt="radio"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
