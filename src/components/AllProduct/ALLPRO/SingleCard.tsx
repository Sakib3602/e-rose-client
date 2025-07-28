"use client"

import { useState } from "react"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage: string
  category: string
  isOnSale: boolean
  discount?: number
}

interface ProductCardProps {
  product: Product
}

export default function SingleCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = () => {
    console.log("Added to cart:", product.name)
  }

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sale Badge */}
      {product.isOnSale && (
        <div className="absolute top-3 left-3 z-10 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
          -{product.discount}%
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Always Visible Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            className={`h-9 w-9 rounded-full shadow-lg backdrop-blur-sm transition-colors duration-200 ${
              isWishlisted ? "bg-primary text-white hover:bg-primary/90" : "bg-white/90 hover:bg-white text-gray-700"
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 transition-all duration-200 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>

          <Button
            size="icon"
            className="h-9 w-9 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white transition-all duration-200"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>

        <h3 className="font-semibold text-base text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
