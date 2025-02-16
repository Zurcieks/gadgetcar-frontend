"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import Image from "next/image";
import { Product } from "../../../../types/product.types";
import { Button } from "../ui/button";
import {  ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
    
  return (
    <Card key={product._id} className="p-0 flex flex-col justify-between">
      <CardHeader className="p-0 relative">
        <Image
          src={
            product.images?.[0]
              ? `http://localhost:5000/${product.images[0]}`
              : ""
          }
          alt="Zdjęcie"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <Badge className="absolute top-0 left-2">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Badge>

        <div className="p-6">
          <CardTitle>{product.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-xl font-bold">{product.price} zł</p>
        <CardDescription>{product.description.slice(0, 80)}</CardDescription>
      </CardContent>
      <CardFooter className="flex">
        <Button>
          <ShoppingCartIcon className="size-4 " />
          Dodaj do koszyka
        </Button>
      </CardFooter>
    </Card>
  );
}
