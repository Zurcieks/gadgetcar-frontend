"use client";

import { useParams } from "next/navigation";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { ProductBreadcrumb } from "@/app/components/productComponents/productBreadcrumb";
import { ProductInfo } from "@/app/components/productComponents/ProductInfo";
import { ProductGallery } from "@/app/components/productComponents/ProductGallery";
import { useProductById } from "@/hooks/useProduct";

const REVIEWS = {
  href: "#",
  average: 4,
  totalCount: 117,
};

export default function ProductDetail() {
  const { id } = useParams();
  const { product, isLoading, error } = useProductById(id as string);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading product</div>;
  if (!product) return null;

  return (
    <div className="min-h-screen pt-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductBreadcrumb product={product} />

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />

          <div className=" top-24 h-fit">
            <ProductInfo product={product} reviews={REVIEWS} />
          </div>
        </div>
      </div>
    </div>
  );
}
