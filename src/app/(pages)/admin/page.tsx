"use client";

import { getRole } from "@/app/api/apiHelpers";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const checkRole = async () => {
    const role = await getRole();
    try {
      if (!role) {
        router.push("/");
      }
    } catch (error) {
      console.log("Błąd podczas sprawdzania roli", error);
    }
  };

  useEffect(() => {
    checkRole();
  }, []);

  return <div>Dupa</div>;
};

export default page;
