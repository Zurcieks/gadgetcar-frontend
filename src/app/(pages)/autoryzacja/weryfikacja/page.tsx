/* eslint-disable */
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "../../../../../api/axiosInstance";
import { Suspense } from "react";

function Verify() {
  const [status, setStatus] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      axiosInstance
        .get(`/auth/verify`, { params: { token } })
        .then((response) => {
          setStatus(
            "Konto zostało pomyślnie potwierdzone. Możesz powrócić do strony logowania."
          );
        })
        .catch((error) => {
          setStatus(
            "Błąd weryfikacji konta. Użytkownik może być już potwierdzony."
          );
        });
    }
  }, [token]);

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="max-w-lg text-center p-6">
        {status ? (
          <div className="text-lg text-green-600">{status}</div>
        ) : (
          <div className="text-lg text-gray-600">Trwa weryfikacja...</div>
        )}
      </div>
    </div>
  );
}

const ConfirmPage: React.FC = () => {
  return <Suspense fallback={<div>Ładowanie...</div>}>
    <Verify/>
  </Suspense>;
};

export default ConfirmPage;
