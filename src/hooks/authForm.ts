import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LoginFormData,
  LoginFormErrors,
  RegisterFormErrors,
} from "../../types/auth.types";
import {
  validateLoginForm,
  validateRegisterForm,
} from "../../utils/validation";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "./use-toast";

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
        router.push("/konto");
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
          router.push("/autoryzacja/logowanie");
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

export const requestResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/auth/request-reset-password",
        { email }
      );
      if (response.status === 201) {
        toast({
          variant: "success",
          title: "Sukces!",
          description: "Link resetujący hasło został wysłany na adres email.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Błąd!",
          description:
            "Wystąpił błąd podczas wysyłania linku resetującego hasło.",
        });
      }
    } catch (error: any) {
      if (error.status === 404) {
        toast({
          variant: "destructive",
          title: "Błąd!",
          description: "Nie znaleziono adresu email w naszej bazie.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Błąd!",
          description: "Przekroczono limit żądań lub wystąpił inny problem.",
        });
      }
    }
  };

  return {
    handleSubmit,
    email,
    setEmail,
    message,
    setMessage,
  };
};

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Hasła muszą być takie same.",
      });

      return;
    }

    try {
      if (!token) {
        toast({
          variant: "destructive",
          title: "Błąd",
          description: "Brak tokenu.",
        });
        return;
      }

      const response = await axiosInstance.post(`/auth/reset-password`, {
        token,
        newPassword,
      });

      if (response.data) {
        toast({
          variant: "success",
          title: "Sukces!",
          description: "Hasło zostało zmienione.",
        });

        setTimeout(() => {
          router.push("/autoryzacja/logowanie");
        }, 3000);
      }
    } catch (error) {
      console.log("Wystąpił błąd. Spróbuj ponownie", error);
      setMessage("Wystąpił błąd. Spróbuj ponownie później.");
    }
  };
  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    setMessage,
    error,
    setError,
    router,
    useSearchParams,
    token,
    handleSubmit
  }
}
