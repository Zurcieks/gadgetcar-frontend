import { useRouter } from "next/navigation";
import React from "react";
import axiosInstance from "./axiosInstance";
const apiHelpers = () => {
  return (
    <></>
  )
}

export const handleLogout = async () => {
  const router = useRouter();
  try {
    const response = await axiosInstance.post("/auth/logout");
    if (response.status === 200) {
      router.push("/auth/sign-in");
    }
  } catch (error) {
    console.error("Błąd podczas wylogowywania", error);
    return false;
  }
};


export default apiHelpers;
