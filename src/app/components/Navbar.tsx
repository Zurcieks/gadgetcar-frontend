"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const navigation = {
  pages: [
    { name: "Produkty", href: "/produkty" },
    { name: "O nas", href: "/o-nas" },
    { name: "Regulamin", href: "/regulamin" },
    { name: "Kontakt", href: "/kontakt" },
  ],
};

interface ExampleProps {
  backgroundColor?: string; // Opcjonalny kolor tła
  borderColor?: string; // Opcjonalny kolor obramowania
  logoSrc?: string; // Dynamiczny URL do loga
  textColor?: string; // Opcjonalny kolor tekstu
}

export default function Example({
  backgroundColor = "bg-transparent", // Domyślny kolor tła
  borderColor = "", // Domyślny kolor obramowania
  logoSrc = "/logo.png", // Domyślny URL do loga
  textColor = "", // Domyślny kolor tekstu
}: ExampleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`absolute top-0 w-full ${backgroundColor}   z-50  backdrop-blur-sm  h-20`}
    >
      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-50 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2 z-50">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`relative -m-2 inline-flex items-center justify-center rounded-md p-2 ${textColor}`}
              >
                <XMarkIcon aria-hidden="true" className="size-7 z-50" />
              </button>
            </div>

            <div className="space-y-8  z-50 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className={`-m-2 block p-2 font-medium ${textColor}`}
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className={`z-50  ${borderColor} `}>
        <nav className="mx-auto w-auto mr-0 ml-0 lg:mr-24 lg:ml-2 px-4 sm:px-6 lg:px-7">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 mr-auto ">
              <button
                type="button"
                className={`lg:hidden p-2 ${textColor} `}
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div>
                <Link href="/">
                  <img
                    alt="Logo"
                    src={logoSrc}
                    className="h-40 w-40 mr-auto cursor-pointer"
                  />
                </Link>
              </div>

              <div className="hidden lg:flex gap-10 z-50 ">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className={`text-sm font-semibold ${textColor} hover:text-gray-800`}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6 ml-auto">
              <Link
                href="/konto"
                className={`${textColor} hover:text-gray-500`}
              >
                <span className="sr-only">Konto</span>
                <UserIcon className="h-7 w-7" aria-hidden="true" />
              </Link>

              <Link href="#" className={`${textColor} hover:text-gray-500`}>
                <span className="sr-only">Koszyk</span>
                <ShoppingBagIcon className="h-7 w-7" aria-hidden="true" />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
