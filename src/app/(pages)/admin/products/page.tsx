"use client";

import ShowProducts from "@/app/components/adminComponents/ShowProducts";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { withAdminProtection } from "../../../../../hoc/withAdminAuth";

const add = () => {
  return (
    <div className="p-4">
      <section className="flex justify-center items-center text-center mt-4">
        <ShowProducts />
      </section>
    </div>
  );
};

export default withAdminProtection(add);
