import Details from "@/app/components/accountComponents/Details";
import Sidebar from "@/app/components/accountComponents/Sidebar";
import React from "react";

export default function Account() {
  return (
    <div className="min-h-screen mt-10  dark:text-white">
      <div className="container  mx-auto px-4 lg:px-8 py-12 mt-5">
        <div className="dark:shadow-xl dark:border-2 overflow-hidden ">
          <header className="border-b dark:bg-gray-950 border-gray-200 px-6  py-4">
            <h1 className="text-3xl font-semibold dark:bg-gray-950 text-black dark:text-white ">
              Twoje konto
            </h1>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-4 dark:bg-gray-950 dark:text-white">
            <Sidebar />
            <Details />
          </div>
        </div>
      </div>
    </div>
  );
}
