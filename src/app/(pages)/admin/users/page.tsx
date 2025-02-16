"use client";

import { useEffect, useState } from "react";
import { withAdminProtection } from "../../../../../hoc/withAdminAuth";
 
import { User } from "../../../../../types/user.types";
import { UserTable } from "@/app/components/adminComponents/UserTable";
import axiosInstance from "../../../../../api/axiosInstance";
 
const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
 

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await axiosInstance.patch('/user/change-role', {
        userRoles: [newRole],
        userId: userId
      });
  
      if (response.status === 200) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        ));
        
      } else {
        console.error("Error changing user role: Server responded with status", response.status);
      }
    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Users List</h1>
      <UserTable users={users} onRoleChange={handleRoleChange} />
    </div>
  );
};

export default withAdminProtection(Page);
