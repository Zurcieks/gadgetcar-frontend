"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Image from "next/image";
import Link from "next/link";

const RecoveryPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/auth/request-reset-password",
        { email }
      );
      if (response.status === 201) {
        setMessage(
          "Na twój adres e-mail został wysłany link do resetowania hasła"
        );
        setIsTimerActive(true);
      }
    } catch (error) {
      console.error("Błąd podczas wysłania linku resetującego", error);
      setMessage("Wystąpił błąd. Spróbuj ponownie");
    }
  };

  return (  
    <div className="flex justify-center items-center md:h-screen bg-blue-50 ">
      <div className="max-w-md w-full h-[90vh] md:h-[50vh] flex justify-center  flex-col bg-white shadow-2xl rounded-lg px-8">
        <div className="flex flex-col justify-center mr-10 items-center mb-5">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="object-contain  "
            />
          </Link>
  
        </div>

        <div className="flex flex-col -mt-20">
          <form onSubmit={handleSubmit} className="mt-10">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Podaj swój adres e-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder-gray-500"
                required
                placeholder="Wpisz swój adres email"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 mt-5 focus:ring-blue-500 transition duration-200"
            >
              Wyślij link resetujący
            </button>
          </form>

          {message && (
            <div className="mt-4 text-center text-gray-700">
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecoveryPasswordRequest;
