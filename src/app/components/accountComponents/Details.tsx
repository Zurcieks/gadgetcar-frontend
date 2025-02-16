"use client";
import React from "react";

import { useUserForm } from "../../../hooks/userForm";
import { FormField } from "./FormField";
import { User } from "../../../../types/user.types";
import { Button } from "../ui/button";

const personalFields = [
  { label: "Imię", name: "firstName", type: "text" },
  { label: "Nazwisko", name: "lastName", type: "text" },
  { label: "Data urodzenia", name: "dateOfBirth", type: "date" },
  { label: "Numer telefonu", name: "phoneNumber", type: "tel" },
  { label: "Adres email", name: "email", type: "email" },
];

const addressFields = [
  { label: "Adres zamieszkania", name: "address", type: "text" },
  { label: "Kod pocztowy", name: "postalCode", type: "text" },
  { label: "Miasto", name: "city", type: "text" },
  { label: "Województwo", name: "voivodeship", type: "text" },
];

export const UserDetail: React.FC = () => {
  const { formData, isEditing, handleChange, handleSave, setIsEditing } =
    useUserForm();

  if (!formData) return null;

  return (
    <main className="p-6 md:col-span-3 min-h-screen overflow-y-auto">
      <section id="details" className="mb-8">
        <h2 className="text-xl font-semibold  mb-4">Twoje dane</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalFields.map((field) => (
              <FormField
                key={field.name}
                {...field}
                value={
                  field.name === "dateOfBirth"
                    ? formData[field.name]
                      ? new Date(formData[field.name])
                          .toISOString()
                          .split("T")[0]
                      : ""
                    : formData[field.name as keyof User] || ""
                }
                onChange={handleChange}
                readOnly={!isEditing}
              />
            ))}
          </div>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold  mb-4">Adresy</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addressFields.map((field) => (
              <FormField
                key={field.name}
                {...field}
                value={formData[field.name as keyof User] || ""}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            ))}
          </div>
        </form>
      </section>

      <Button variant="outline"  
        type="button"
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
      >
        {isEditing ? "Zapisz" : "Edytuj"}
      </Button>
    </main>
  );
};

export default UserDetail;
