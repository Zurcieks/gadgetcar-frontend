export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    availability: "dostępny" | "niedostępny";
    stock_quantity: number;
    category: "Akcesoria" | "Radia";
  }