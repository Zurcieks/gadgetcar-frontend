"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRole } from "../../../../hooks/useRole";

const navigationLinks = [
  { href: "#details", label: "Dane osobowe", primary: true },
  { href: "#address", label: "Metody płatności" },
  { href: "#orders", label: "Zamówienia" },
  { href: "#settings", label: "Ustawienia" },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { isAdmin, handleLogout } = useRole();

  const onLogout = async () => {
    const success = await handleLogout();
    if (success) {
      router.push("/auth/sign-in");
    }
  };

  return (
    <aside className="bg-white p-6 md:col-span-1">
      <nav className="space-y-4">
        {navigationLinks.map(({ href, label, primary }) => (
          <Link
            key={href}
            href={href}
            className={`block ${
              primary
                ? "text-blue-600 font-medium hover:underline"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {label}
          </Link>
        ))}

        {isAdmin && (
          <Link
            href="/admin"
            className="block text-gray-600 hover:text-blue-600"
          >
            Admin
          </Link>
        )}

        <button
          onClick={onLogout}
          className="block text-gray-600 hover:text-blue-600"
        >
          Wyloguj
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
