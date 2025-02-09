"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { useRegisterForm } from "../../../../../hooks/authForm";
import InputField from "@/app/components/authComponents/InputField";
import SubmitButton from "@/app/components/authComponents/submitButton";
import Message from "@/app/components/authComponents/message";

const RegisterPage: React.FC = () => {
  const { isLoading, message, errors, handleSubmit, messageType  } = useRegisterForm();

  return (
    <div className="h-screen justify-center bg-white">
      <div className="h-screen flex justify-center w-screen rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col justify-center items-center w-full sm:w-2/3 lg:w-2/3 p-12 mt-5">
          <h2 className="text-4xl font-bold font-sans text-gray-800 text-center mt-24">
            Zarejestruj się
          </h2>

          <p className="text-md text-gray-600 text-center mt-2 mb-6">
            Masz już konto?{" "}
            <Link
              href="/auth/sign-in"
              className="text-blue-500 hover:underline"
            >
              Zaloguj się
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 w-full lg:w-2/3">
            <InputField
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Imię"
              error={errors.firstName}
            />
            <InputField
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Nazwisko"
              error={errors.lastName}
            />
            <InputField
              id="email"
              name="email"
              type="email"
              placeholder="Adres email"
              error={errors.email}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Hasło"
              error={errors.password}
            />

            <SubmitButton
              isLoading={isLoading}
              disabled={isLoading}
              loading="Rejestracja"
              name="Zarejestruj się"
            />
          </form>

          {message && <Message message={message} type={messageType} />}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Lub kontynuuj</p>
            <div className="flex justify-center mt-4">
              <button className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg mx-2 transition-all duration-300 text-base">
                <FaGoogle className="mr-2" /> Google
              </button>
            </div>
          </div>
        </div>

        <div className="w-2/3 relative hidden lg:block">
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
