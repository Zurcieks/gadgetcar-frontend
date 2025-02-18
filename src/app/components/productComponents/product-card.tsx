"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import Image from "next/image";
 
import { Button } from "../ui/button";
import {  ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { useDispatch } from "react-redux";
import { useAddItemMutation } from "@/redux/cartApi";
import { addItem, CartItem } from "../../../redux/cartSlice";
import { toast } from "@/hooks/use-toast";
import { Product } from "../../../../types/product.types";
interface ProductCardProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCardProps) {
  const quantity = 1;
  const dispatch = useDispatch(); 
  const [addItemMutation] = useAddItemMutation(); 
  

  const handleAddToCart = async () => {
    const cartItem: CartItem = {
      productId: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity,
      images: product.images,
      availability: product.availability,
      category: product.category,
    };

    try {
      await addItemMutation(cartItem).unwrap();
      dispatch(addItem(cartItem));
      toast({
        variant: "success",
        title: "Sukces!",
        description: "Przedmiot został dodany do koszyka.",
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }

 
  };
    
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
      <CardFooter className="flex" >
        <Button  onClick={handleAddToCart} className="flex-1">
          <ShoppingCartIcon className="size-4 "/>
          Dodaj do koszyka
        </Button>
      </CardFooter>
    </Card>
  );
}
