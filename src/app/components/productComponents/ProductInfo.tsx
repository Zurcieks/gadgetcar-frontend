import { Link, StarIcon } from "lucide-react";
import { Product } from "../../../../types/product.types";
import { useState } from "react";

interface ProductInfoProps {
  product: Product;
  reviews: {
    href: string;
    average: number;
    totalCount: number;
  };
}

export function ProductInfo({ product, reviews }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight ">
          {product.name}
        </h1>
        <p className="mt-3 text-3xl tracking-tight ">
          {new Intl.NumberFormat("pl-PL", {
            style: "currency",
            currency: "PLN",
          }).format(product.price)}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, idx) => (
            <StarIcon
              key={idx}
              className={`h-5 w-5 ${
                idx < reviews.average ? "text-yellow-400" : ""
              }`}
            />
          ))}
        </div>
        <Link
          href={reviews.href}
          className="text-sm text-indigo-600 hover:text-indigo-600"
        >
          {reviews.totalCount} Opinie
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="w-auto">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-md border border-gray-300 py-3 px-4 text-base focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {[...Array(Math.min(10, product.stock_quantity))].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="w-1/2 rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Dodaj do koszyka
        </button>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium">
              Szczegóły produktu
            </h3>
            <div className="mt-4 space-y-4">
              <p className="text-sm ">{product.description}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900">Dostępność</h3>
            <p className="mt-2 text-sm ">
              Status:{" "}
              <span className="font-medium">{product.availability}</span>
            </p>
            <p className="mt-2 text-sm ">
              Ilość w magazynie:{" "}
              <span className="font-medium">{product.stock_quantity}</span>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium ">Kategoria</h3>
            <p className="mt-2 text-sm">{product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
