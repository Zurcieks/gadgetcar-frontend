"use client";
import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "../../../../../api/axiosInstance";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { ResetPassword } from "@/hooks/authForm";
import { Label } from "@/app/components/ui/label";
import { ResetCard } from "@/app/components/authComponents/ResetCard";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen  ">
      <div className="">
        <ResetCard />
      </div>
    </div>
  );
};

export default Page;
