"use client";
import React, { Suspense } from "react";
import { ResetCard } from "@/app/components/authComponents/ResetCard";

const Page = () => {
  return (
    <Suspense>
      <div className="flex justify-center items-center h-screen  ">
        <div className="">
          <ResetCard />
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
