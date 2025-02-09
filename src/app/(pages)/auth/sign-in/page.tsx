"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import InputField from "@/app/components/authComponents/InputField";
import SubmitButton from "@/app/components/authComponents/submitButton";
import Message from "@/app/components/authComponents/message";
import { useLoginForm } from "../../../../../hooks/authForm";

const LoginPage: React.FC = () => {
  const {
    formData,
    errors,
    isLoading,
    message,
    messageType,
    handleInputChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="h-screen justify-center bg-white">
      <div className="h-screen flex justify-center w-screen rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full sm:w-2/3 lg:w-2/3 p-12">
          <h2 className="text-4xl font-bold font-sans text-gray-800 text-center mb-3">
            Zaloguj się
          </h2>

          <p className="text-md text-gray-600 text-center mb-8">
            Nie masz konta?{" "}
            <Link
              href="/auth/sign-up"
              className="text-blue-500 hover:underline"
            >
              Zarejestruj się
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 w-full lg:w-2/3">
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="Adres email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Hasło"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />

            <div className="flex justify-between mb-6">
              <label className="flex text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="mr-2"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                Zapamiętaj mnie
              </label>

              <Link
                href="/auth/requestRecoveryPassword"
                className="text-sm text-blue-500 hover:underline"
              >
                Zapomniałeś hasła?
              </Link>
            </div>

            <SubmitButton
              isLoading={isLoading}
              disabled={isLoading}
              loading="Logowanie"
              name="Zaloguj się"
            />
          </form>

          {message && <Message message={message} type={messageType}  />}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Lub kontynuuj</p>
            <div className="flex justify-center mt-4">
              <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-4 rounded-lg mx-2 transition-all duration-300 text-lg">
                <FaGoogle className="mr-2" /> Google
              </button>
            </div>
          </div>
        </div>

        <div className="w-2/3 relative hidden lg:block  ">
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
