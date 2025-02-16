"use client";
import React from "react";

import { RequestCard } from "@/app/components/authComponents/requestCard";

const RecoveryPasswordRequest = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col ">
        <RequestCard />
      </div>
    </div>
  );
};

export default RecoveryPasswordRequest;
