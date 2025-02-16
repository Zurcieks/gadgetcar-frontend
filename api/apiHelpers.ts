import axiosInstance from "./axiosInstance";

export const handleLogout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Błąd podczas wylogowywania", error);
    return false;
  }
};

export const getRole = async () => {
  try {
    const response = await axiosInstance.get("/user/id");
    
    if (response.status === 200 && response.data.role === "admin") {
      console.log(response)
      return true;
    }
  } catch (error) {
    console.error("Błąd podczas sprawdzania roli", error);
    return false;
  }
};
