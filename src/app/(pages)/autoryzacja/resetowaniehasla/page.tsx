"use client";
import React, { Suspense } from "react";
import { ResetCard } from "@/app/components/authComponents/ResetCard";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center items-center h-screen  ">
        <div className="">
          <ResetCard />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
