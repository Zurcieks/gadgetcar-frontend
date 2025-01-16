import Details from "@/app/components/accountComponents/Details";
import Sidebar from "@/app/components/accountComponents/Sidebar";
import React from "react";

export default function Account() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container    mx-auto px-4 lg:px-8 py-12">
        <div className="bg-white shadow-md overflow-hidden">
          <header className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-3xl font-semibold text-gray-800">
              Twoje konto
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4">
            <Sidebar />
            <Details/>
          </div>
        </div>
      </div>
    </div>
  );
}
