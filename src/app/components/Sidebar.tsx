"use client";
import {
  HomeIcon,
  ShoppingCartIcon,
  Bars3Icon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { CiLogout, CiMoneyBill } from "react-icons/ci";

import { usePathname } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";

import { useRouter } from "next/navigation";
import { handleLogout } from "../api/apiHelpers";

const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Strona główna", icon: HomeIcon },
    { href: "/admin", label: "Dashboard", icon: MdOutlineDashboard },
    { href: "/admin/products", label: "Produkty", icon: ShoppingCartIcon },
    { href: "/admin/orders", label: "Zamówienia", icon: CiMoneyBill },
    { href: "/admin/users", label: "Użytkownicy", icon: UserIcon },
  ];

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const Logout = async () => {
    const Log = await handleLogout();
    try {
      if (Log) {
        router.push("/auth/sign-in");
      }
    } catch (error) {
      console.log("Błąd podczas wylogowania", error);
    }
  };

  return (
    <>
      <button
        onClick={toggleSideBar}
        className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg focus:outline-none md:hidden"
      >
        <Bars3Icon className="h-6 w-6 text-gray-700" />
      </button>

      <div
        className={`h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-200 flex flex-col z-40 transition-transform duration-300 ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Link href="/">
            <span className="sr-only">Your Company</span>
            <img alt="" src="/logo.png" className="h-40 w-40" />
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 absolute mt-20">
          <ul className="space-y-4">
            {links.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center  hover:text-indigo-600 ${
                    pathname === href ? "text-blue-700 font-bold " : ""
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  onClick={Logout}
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <CiLogout className="h-5 w-5 mr-3" />
                  Wyloguj się
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
