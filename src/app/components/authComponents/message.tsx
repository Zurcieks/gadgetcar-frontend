import React from "react";

interface MessageProps {
  message: string | null;
  type?: "success" | "error";
}

const Message: React.FC<MessageProps> = ({ message, type = "error" }) => {
  if (!message) return null;
  const styles = {
    success: "border-2 border-green-500 text-green-600 bg-green-50 ",
    error: "border-2 border-red-500 text-red-600 bg-red-50",
  };

  return (
    <div className={`mt-4 text-center text-md ${styles[type]} px-2`}>
      {message}
    </div>
  );
};

export default Message;
