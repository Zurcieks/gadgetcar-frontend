import { useState, useEffect } from "react";
import { User } from "../../types/user.types";
import axiosInstance from "../../api/axiosInstance";
import { useToast } from "./use-toast";

export const useUserForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/id");
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = async () => {
    try {
      if (formData) {
        const response = await axiosInstance.put(`/user`, formData);
        setIsEditing(false);

        if (response.status === 200) {
          toast({
            variant: "success",
            title: "Sukces!",
            description: "Twoje dane zostały zapisane pomyślnie.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Błąd!",
            description: "Wystąpił problem podczas zapisywania danych.",
          });
        }
      }
    } catch (error) {
      console.log("Error updating user data:", error);

      toast({
        variant: "destructive", 
        title: "Błąd!",
        description: "Wystąpił problem podczas zapisywania danych.",
      });
    }
  };

 

  return {
    formData,
    isEditing,
    handleChange,
    handleSave,
    setIsEditing,
 
  };
};
