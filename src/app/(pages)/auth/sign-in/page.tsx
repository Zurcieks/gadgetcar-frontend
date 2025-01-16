"use client";
import React, { useState } from "react";
import { FaGoogle, FaGithub, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import axiosInstance from "../../../../../utils/api/axiosInstance";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    // Walidacja adresu email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailPattern.test(email)) {
      newErrors.email = "Podaj poprawny adres email";
      valid = false;
    }

    // Walidacja hasła
    if (!password) {
      newErrors.password = "Hasło jest wymagane";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sprawdzamy poprawność formularza przed wysłaniem
    if (!validateForm()) {
      return; // Zatrzymujemy wysyłanie formularza, jeśli walidacja nie przejdzie
    }
    
    setIsLoading(true);
    
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
        rememberMe,
      });
    
      // Zmodyfikuj logowanie na podstawie statusu odpowiedzi
      console.log('Odpowiedź z backendu:', response); // Dodaj szczegóły odpowiedzi
    
      if (response.status === 200 || response.status === 201) {
        console.log("Logowanie udane");
        router.push("/account");
      } else {
        console.log("Odpowiedź z backendu:", response);
        console.error("Nieoczekiwany status:", response.status); // Logowanie nieoczekiwanego statusu
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[70vh] mt-36 w-full flex items-center justify-center bg-white px-4 py-6 sm:px-8 lg:px-12">
      <div className="w-full max-w-7xl flex flex-col-reverse md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
            Zaloguj się
          </h2>
          <p className="text-md text-gray-600 text-center mt-2 mb-8">
            Nie masz konta?{" "}
            <Link
              href="/auth/sign-up"
              className="text-blue-500 hover:underline"
            >
              Zarejestruj się
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                className="block text-md font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Adres email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-lg"
                placeholder="Podaj swój adres email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Hasło
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-lg"
                placeholder="Podaj hasło"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{" "}
                Zapamiętaj mnie
              </label>
              <Link href="/auth/requestRecoveryPassword" className="text-sm text-blue-500 hover:underline">
                Zapomniałeś hasła?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-4 px-2 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center disabled:bg-blue-300 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Zaloguj się"
              )}
              {isLoading ? "Logowanie..." : ""}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Lub kontynuuj</p>
            <div className="flex justify-center mt-4">
              <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-4 rounded-lg mx-2 transition-all duration-300 text-lg">
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

export default LoginPage;
