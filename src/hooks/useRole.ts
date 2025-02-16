 
import { useState, useEffect } from 'react';
import { getRole, handleLogout } from '../../api/apiHelpers';
 

export const useRole = () => {
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const role = await getRole();
        if (role) {
          setAdmin(true);
        }
      } catch (error) {
        console.log("Błąd podczas sprawdzania roli", error);
      }
    };

    checkRole();
  }, []);

  return {
    isAdmin,
    handleLogout
  };
};