"use client"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Home, ShoppingCart, Heart, User } from "lucide-react"
import { Link } from "react-router-dom"

interface BottomNavProps {
  cartCount?: number
}

interface WishlistItem {
  _id: string // Using _id as the primary identifier
  name: string
  price: string
  Hprice?: string // Optional original price
  image: string
}

export default function Only_Sm_Show({ cartCount = 3 }: BottomNavProps) {
  const [activeTab, setActiveTab] = useState("shop")
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0) 

  // Function to update wishlist count from localStorage
  const updateWishlistCount = () => {
    const storedWishlist = localStorage.getItem("wishList")
    const currentWishlist: WishlistItem[] = storedWishlist ? JSON.parse(storedWishlist) : []
    setWishlistItemsCount(currentWishlist.length)
  }

  useEffect(() => {
    
    updateWishlistCount()

    // Listen for custom event from Tranding component or any other component updating wishlist
    window.addEventListener("wishlistUpdated", updateWishlistCount)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount)
    }
  }, []) // Empty dependency array means this runs once on mount and cleans up on unmount

  const navItems = [
    {
      id: "shop",
      icon: Home,
      label: "Shop",
      href: "/",
      count: null,
    },
    {
      id: "cart",
      icon: ShoppingCart,
      label: "Cart",
      href: "/cart",
      count: cartCount,
    },
    {
      id: "wishlist",
      icon: Heart,
      label: "Wishlist",
      href: "/wish",
      count: wishlistItemsCount, // Use the state variable here
    },
    {
      id: "account",
      icon: User,
      label: "Account",
      href: "/account",
      count: null,
    },
  ]

  const handleNavClick = (id: string, href: string, label: string) => {
    setActiveTab(id)
    console.log(`Navigating to ${href} - ${label}`)
    // Add your navigation logic here (e.g., using useRouter from Next.js)
  }

  return (
    <div className=" sm:hidden md:block lg:hidden">
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <Link to={item?.href}>
               
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href, item.label)}
                className={`flex flex-col items-center justify-center gap-1 p-2 transition-all duration-200 ${
                  isActive ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`h-5 w-5 transition-colors ${isActive ? "text-white" : "text-gray-600"}`}
                    style={{
                      color: isActive ? "#761A24" : "#6b7280",
                    }}
                  />
                  {item.count !== null &&
                    item.count > 0 && ( // Check for null explicitly
                      <Badge
                        className="absolute -top-2 -right-2 h-3 w-3 p-0 flex items-center justify-center text-xs"
                        style={{ backgroundColor: "#761A24", color: "white" }}
                      >
                       
                      </Badge>
                    )}
                </div>
                <span
                  className={`text-xs font-medium transition-colors ${isActive ? "font-semibold" : ""}`}
                  style={{
                    color: isActive ? "#761A24" : "#6b7280",
                  }}
                >
                  {item.label}
                </span>
              </button>
            
              </Link>
            )
          })}
        </div>
      </div>
      {/* Spacer to prevent content from being hidden behind bottom nav */}
      <div className="h-16"></div>
    </div>
  )
}
