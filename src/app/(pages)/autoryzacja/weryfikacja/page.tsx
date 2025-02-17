"use client"
import { VerifyAccount } from "@/hooks/authForm";
import React from "react";
 
 

const ConfirmPage: React.FC = () => {
  const {
    status
  } = VerifyAccount();

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
};

export default ConfirmPage;
