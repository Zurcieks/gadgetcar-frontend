import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Breadcrumb() {
  return (
    <nav className="flex mt-5" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <Link href="/" className="text-sm   font-medium">
            Strona główna
          </Link>
        </li>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        <li>
          <span className="text-sm font-medium">Konto</span>
        </li>
      </ol>
    </nav>
  );
}
