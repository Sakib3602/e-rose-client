"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: number
  name: string
  price: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Paro Lota",
    price: "$3049",
    image: "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/495567318_122176929212286011_1267074831665120748_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=c_BPIxRx4R4Q7kNvwEc1YQ8&_nc_oc=AdlXi4EUFBVcBF48SsuDPxfss4wsBDC0ORse6T80WjpsXRqeee7F359_DikB7WPm2Vc&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=lx_uhSEUykehylYnXUZyQw&oh=00_AfRCBqOmzaGsckNmjPywkJgjBpw0xhNasTlnNsxkfjaCrA&oe=688A47EC",
  },
  {
    id: 2,
    name: "Charo Lota",
    price: "$8900",
    image: "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/493097603_122175606872286011_4197693293343124226_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_46lXvaCaAwQ7kNvwE_550y&_nc_oc=AdniIZm-fAZLgKcAxEB0MgIu0sCIt77QgEAI-X7et1wxah4bKnA3z-Vh65uCqf4Cp7Y&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=jhPpPwsHSqurc4VjfKXwrg&oh=00_AfQ5UQ5xsjAlR9Hyjn60OSAh_DUTdIQNkqO3Yi_6gNKHyg&oe=688A32A4",
  },
  {
    id: 3,
    name: "karo Lota",
    price: "$9090",
    image: "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/493017031_122175606932286011_474123576897861874_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=dldFZkBgE4IQ7kNvwHZg8V8&_nc_oc=AdmTdyZBwMf6mzkZtJAbbKBGK9xjNmMyXhrtgQ4MF6FUrIT37xL3BJ2_juzkRbpU26g&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=3HdzdcekJLF_p1Z5LkZ7hQ&oh=00_AfQTUMsjM_Q3ZuW92x7lVJ6bLu14fyaMHoEScLgSGeO6EA&oe=688A4B5E",
  },
  {
    id: 4,
    name: "Neru Lota",
    price: "$1000",
    image: "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/492886146_122175606944286011_6780766559231129298_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Un123NTKNS4Q7kNvwH1mZJf&_nc_oc=AdlzUHr3f2qKcvAjHknbZIMb2w0drGzUR2DhxFJnK_9Gse8reN3qEZvT7xfOl3CiCVA&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=ljJBe43MjJEDu8m37Awitw&oh=00_AfTQEv_8TxeY3vWZKYiN9_zskJWgeKSUxLYZx-x4TUEOeg&oe=688A58EC",
  },
  
]

export default function Regular() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [wishlistedItems, setWishlistedItems] = useState<Set<number>>(new Set())
  const [itemsPerView, setItemsPerView] = useState(3)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Responsive breakpoints
  const updateItemsPerView = () => {
    const width = window.innerWidth
    if (width < 640) {
      setItemsPerView(1) // Mobile
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

  const toggleWishlist = (productId: number) => {
    setWishlistedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product)
    // Add your cart logic here
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: "#761A24" }}>
          Featured Products
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">
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
            <div key={product.id} className="py-4 flex-shrink-0 px-2 sm:px-3" style={{ width: `${100 / itemsPerView}%` }}>
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 group">
                {/* Image container with overlay icons */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-70 sm:h-80 lg:h-96 object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-105 group-hover:saturate-110 group-hover:hue-rotate-3"
                    style={{
                      filter: "brightness(1) contrast(1) saturate(1) hue-rotate(0deg)",
                    }}
                  />

                  {/* Overlay with icons - always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent group-hover:from-black/30 group-hover:via-black/5 transition-all duration-700">
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                          wishlistedItems.has(product.id)
                            ? "bg-red-500 text-white shadow-lg"
                            : "bg-white bg-opacity-90 text-gray-700 hover:bg-red-500 hover:text-white"
                        }`}
                      >
                        <Heart
                          size={16}
                          className={`sm:w-[18px] sm:h-[18px] ${wishlistedItems.has(product.id) ? "fill-current" : ""}`}
                        />
                      </button>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-1.5 sm:p-2 rounded-full bg-white bg-opacity-90 text-gray-700 backdrop-blur-sm hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#761A24")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)")}
                      >
                        <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product details */}
                <div className="p-3 text-center">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800  line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: "#761A24" }}>
                      {product.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows - Hidden on mobile */}
        <button
          onClick={goToPrevious}
          className="absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 lg:p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
          style={{ backgroundColor: "white" }}
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
          style={{ backgroundColor: "white" }}
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
