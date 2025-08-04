"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Home, ShoppingCart, Heart, User } from "lucide-react"
import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface BottomNavProps {
  cartCount?: number
}

interface WishlistItem {
  _id: string
  name: string
  price: string
  Hprice?: string
  image: string
}

interface CartItem {
  id: string
  name: string
  price: string // Stored as string, will parse for calculation
  image: string
}

export default function Only_Sm_Show({ cartCount = 3 }: BottomNavProps) {
  const [activeTab, setActiveTab] = useState("shop")
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const updateWishlistCount = () => {
    const storedWishlist = localStorage.getItem("wishList")
    const currentWishlist: WishlistItem[] = storedWishlist ? JSON.parse(storedWishlist) : []
    setWishlistItemsCount(currentWishlist.length)
  }

  useEffect(() => {
    updateWishlistCount()
    window.addEventListener("wishlistUpdated", updateWishlistCount)
    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount)
    }
  }, [])

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
      count: wishlistItemsCount,
    },
    {
      id: "account",
      icon: User,
      label: "Account",
      href: "/account",
      count: null,
    },
  ]

  const placeholderCartItems: CartItem[] = [
    {
      id: "item1",
      name: "Stylish T-Shirt",
      price: "29.99",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "item2",
      name: "Comfortable Jeans",
      price: "59.99",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "item3",
      name: "Sporty Sneakers",
      price: "79.99",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const calculateTotal = () => {
    return placeholderCartItems.reduce((sum, item) => sum + Number.parseFloat(item.price), 0).toFixed(2)
  }

  const handleNavClick = (id: string, href: string, label: string) => {
    setActiveTab(id)
    console.log(`Navigating to ${href} - ${label}`)
    if (id === "cart") {
      setIsOpen(true)
    }
  }

  // const handleLinkClick = () => {
  //   setIsOpen(false)
  // }

  return (
    <>
      {/* Bottom Navigation - Visible on small screens, hidden on medium and up */}
      <div className="lg:hidden">
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="grid grid-cols-4 h-16">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              const showDotBadge =
                (item.id === "cart" || item.id === "wishlist") && item.count !== null && item.count > 0

              const commonClasses = `w-full flex flex-col items-center justify-center gap-1 p-2 transition-all duration-200 ${
                isActive ? "bg-gray-50" : "hover:bg-gray-50"
              }`

              const iconStyle = {
                color: isActive ? "#761A24" : "#6b7280",
              }
              const labelStyle = {
                color: isActive ? "#761A24" : "#6b7280",
              }

              const content = (
                <>
                  <div className="relative">
                    <Icon key={item.id} className={`h-5 w-5 transition-colors`} style={iconStyle} />
                    {showDotBadge && (
                      <Badge
                        className="absolute -top-1 -right-1 h-2.5 w-2.5 p-0 rounded-full"
                        style={{
                          backgroundColor: "#761A24",
                          color: "white",
                        }}
                      ></Badge>
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${isActive ? "font-semibold" : ""}`}
                    style={labelStyle}
                  >
                    {item.label}
                  </span>
                </>
              )

              if (item.id === "cart") {
                return (
                  <div
                    key={item.id}
                    className={commonClasses}
                    onClick={() => handleNavClick(item.id, item.href, item.label)}
                  >
                    {content}
                  </div>
                )
              } else {
                return (
                  <Link
                    to={item?.href}
                    key={item.id}
                    className={commonClasses}
                    onClick={() => handleNavClick(item.id, item.href, item.label)}
                  >
                    {content}
                  </Link>
                )
              }
            })}
          </div>
        </div>
        {/* Spacer to prevent content from being hidden behind bottom nav */}
        <div className="h-16"></div>
      </div>

      {/* Sheet (Sidebar) - Trigger visible on small and medium screens */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
        
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[320px] border-l border-border/40 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-border/40 px-4 pt-6">
            <span className="pop400 text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Your Cart
            </span>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
            {placeholderCartItems.length > 0 ? (
              placeholderCartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 grid gap-0.5">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-gray-500 text-xs">${item.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>
          <div className="border-t border-border/40 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">${calculateTotal()}</span>
            </div>
            <Button className="w-full" style={{ backgroundColor: "#761A24", color: "white" }}>
              Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
