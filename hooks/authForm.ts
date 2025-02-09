import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LoginFormData,
  LoginFormErrors,
  RegisterFormErrors,
} from "../types/auth.types";
import { validateLoginForm, validateRegisterForm } from "../utils/validation";
import axiosInstance from "@/app/api/axiosInstance";

export const useLoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string | null;
    type: "success" | "error";
  }>({ text: null, type: "error" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({ email: "", password: "" });
    setMessage({ text: null, type: "error" });

    const validationErrors = validateLoginForm(formData);
    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", formData);
      if (response.status === 200 || response.status === 201) {
        router.push("/account");
      }
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        setMessage({
          text: "Niepoprawny adres email lub hasło",
          type: "error",
        });
      } else {
        setMessage({
          text: "Wystąpił błąd, spróbuj ponownie",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    message: message.text,
    messageType: message.type,
    handleInputChange,
    handleSubmit,
  };
};
export const useRegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string | null;
    type: "success" | "error";
  }>({ text: null, type: "error" });
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: null, type: "error" });
    setErrors({});

    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const formErrors = validateRegisterForm(formValues);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/register", formValues);
      if (response.status === 201) {
        setMessage({
          text: "Na Twój email został wysłany link weryfikacyjny.",
          type: "success",
        });

        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 5000);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setMessage({
          text: "Użytkownik o tym adresie email już istnieje.",
          type: "error",
        });
      } else if (error.response?.status === 500) {
        setMessage({
          text: "Wystąpił błąd serwera. Spróbuj ponownie później.",
          type: "error",
        });
      } else {
        setMessage({
          text: "Wystąpił błąd podczas rejestracji.",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    message: message.text,
    errors,
    messageType: message.type,
    handleSubmit,
  };
};
