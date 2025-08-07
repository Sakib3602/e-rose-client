"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  category: string;
  isOnSale: boolean;
  discount?: number;
  Hprice: number;
}

interface ProductCardProps {
  product: Product;
}

export default function SingleCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };
  console.log(product, "all");

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sale Badge */}
      {product.isOnSale && (
        <div className="absolute top-3 left-3 z-10 bg-[#761A24] text-white px-2 py-1 rounded-full text-xs font-medium">
          {product.category}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 "
        />

        {/* Always Visible Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            className={`h-9 w-9 rounded-full shadow-lg backdrop-blur-sm transition-colors duration-200 ${
              isWishlisted
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-white/90 hover:bg-white text-gray-700"
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-4 w-4 transition-all duration-200 ${
                isWishlisted ? "fill-current" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <h3 className="text-sm sm:text-base pop600 lg:text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Price */}
        <div className="w-full flex justify-center items-center gap-2 pop400 ">
          <span className="text-sm text-gray-500 pop400">
            ৳ {product.price}.00
          </span>
          <span> - </span>
          <span className="text-sm pop400" style={{ color: "#761A24" }}>
            ৳ {product.Hprice}.00
          </span>
        </div>
      </div>
    </div>
  );
}
