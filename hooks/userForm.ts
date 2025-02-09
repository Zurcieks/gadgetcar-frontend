import { useState, useEffect } from 'react';
import { User } from '../types/user.types';
import axiosInstance from '@/app/api/axiosInstance';
 

export const useUserForm = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/id");
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSave = async () => {
    try {
      if (formData) {
        await axiosInstance.put(`/user`, formData);
        setUser(formData);
        setIsEditing(false);
        
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      
    }
  };

  return {
    formData,
    isEditing,
    handleChange,
    handleSave,
    setIsEditing
  };
};