"use client"
import { getProducts } from "@/hooks/useProduct";
import Link from "next/link";

 
export default function Example() {
  const { products } = getProducts();
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl text-center font-sans font-bold tracking-tight">
          Poznaj nasze najciekawsze propozycje
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.slice(0, 4).map((product) => (
            <div key={product._id} className="group relative">
              <img
         
                src={product.images?.[0]
                  ? `http://localhost:5000/${product.images[0]}`
                  : ""}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md ">
                    <Link href={`/produkty/${product._id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
              
                </div>
                <p className="text-sm font-medium ">
                   {`${product.price}zł`} 
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );0
}
