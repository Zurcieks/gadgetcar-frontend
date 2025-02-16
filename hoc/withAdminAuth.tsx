"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRole } from "../api/apiHelpers";
 

export function withAdminProtection(WrappedComponent: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();

    useEffect(() => {
      const checkRole = async () => {
        const role = await getRole();
        try {
          if (!role) {
            router.push("/");
          }
        } catch (error) {
          console.log("Błąd podczas sprawdzania roli", error);
          router.push("/");
        }
      };

      checkRole();
    }, []);

    return <WrappedComponent {...props} />;
  };
}