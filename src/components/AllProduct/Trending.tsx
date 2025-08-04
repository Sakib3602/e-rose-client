"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import useAxiosPub from "../Axios/useAxiosPub"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

interface Product {
  _id: string 
  name: string
  price: string
  Hprice: string 
  image: string 
}

export default function Tranding() {
  const axiosPublic = useAxiosPub()
  const { data: fetchedProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["top"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allData")
     
      return res.data.map((item: any) => ({
        _id: item._id, 
        name: item.name,
        price: item.price,
        Hprice: item.Hprice,
        image: item.pic1, 
      }))
    },
  })

  const products = fetchedProducts

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set())
 
  const [wishTrigger, setWishTrigger] = useState(0)

  const [itemsPerView, setItemsPerView] = useState(3)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishList")
    if (storedWishlist) {
      const parsedWishlist: Product[] = JSON.parse(storedWishlist)
      setWishlistedItems(new Set(parsedWishlist.map((item) => item._id)))
    }
  }, [wishTrigger])

  // Responsive breakpoints
  const updateItemsPerView = () => {
    const width = window.innerWidth
    if (width < 640) {
      setItemsPerView(1) 
    } else if (width < 1024) {
      setItemsPerView(2) // Tablet
    } else {
      setItemsPerView(3) // Desktop
    }
  }

  useEffect(() => {
    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const p =()=>{
    toast.success("item added to the wishlist")
  }
  // Reset currentIndex if it exceeds maxIndex after screen resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex)
    }
  }, [currentIndex, maxIndex])

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= maxIndex) {
            return 0
          }
          return prevIndex + 1
        })
      }, 3000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered, maxIndex])

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex))
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  const saveWish = (productToAdd: Product) => {
    const stored = localStorage.getItem("wishList")
    let wishList: Product[] = stored ? JSON.parse(stored) : []

    const exists = wishList.some((item) => item._id === productToAdd._id)

    if (exists) {
      
      wishList = wishList.filter((item) => item._id !== productToAdd._id)
    } else {
      // Add item
      wishList.push(productToAdd)
    }
    localStorage.setItem("wishList", JSON.stringify(wishList))
    setWishTrigger((prev) => prev + 1) 
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
          {Array.from({ length: itemsPerView }).map((_, i) => (
            <div key={i} className="py-4 flex-shrink-0 px-2 sm:px-3">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden animate-pulse">
                <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] bg-gray-300" />
                <div className="p-3 text-center">
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-2 pop600" style={{ color: "#761A24" }}>
          Top Products
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4 pop400">
          Discover our handpicked selection of premium products crafted for excellence
        </p>
      </div>
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main carousel container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product._id} // Use _id as key
              className="py-4 flex-shrink-0 px-2 sm:px-3"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <Link to={`allproduct/details/${product._id}`}>
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 group">
                  {/* Image container with overlay icons */}
                  <div className="relative overflow-hidden aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                    />
                    {/* Overlay with icons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent group-hover:from-black/30 group-hover:via-black/5 transition-all duration-700">
                      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
                        <button
                          onClick={(e) => {
                            p()
                            e.preventDefault() // Prevent Link navigation when clicking wishlist
                            saveWish(product) // Pass the whole product object
                          }}
                          className={`p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                            wishlistedItems.has(product._id)
                              ? "bg-red-500 text-white shadow-lg"
                              : "bg-white bg-opacity-90 text-gray-700 hover:bg-red-500 hover:text-white"
                          }`}
                        >
                          <Heart
                            size={16}
                            className={`sm:w-[18px] sm:h-[18px] ${
                              wishlistedItems.has(product._id) ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Product details */}
                  <div className="p-3 text-center">
                    <h3 className="text-sm sm:text-base pop600 lg:text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center pop400 justify-center gap-2">
                      {product.Hprice && product.Hprice !== product.price && (
                        <span className="text-sm text-gray-500 pop400">৳ {product.Hprice}</span>
                      )}
                      <span> - </span>
                      <span className="text-sm pop400" style={{ color: "#761A24" }}>
                        ৳ {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 lg:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#761A24"
            e.currentTarget.style.color = "white"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white"
            e.currentTarget.style.color = "#374151"
          }}
        >
          <ChevronLeft size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 lg:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#761A24"
            e.currentTarget.style.color = "white"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white"
            e.currentTarget.style.color = "#374151"
          }}
        >
          <ChevronRight size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700" />
        </button>
      </div>
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8 gap-1 sm:gap-2">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
            style={{
              backgroundColor: currentIndex === index ? "#761A24" : undefined,
            }}
          />
        ))}
      </div>
    </div>
  )
}
