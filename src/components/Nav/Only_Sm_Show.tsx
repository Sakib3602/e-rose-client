"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Home, ShoppingCart, Heart, User, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WishlistItem {
  _id: string
  name: string
  price: string
  Hprice?: string
  image: string
}

interface CartItem {
  id: string 
  _id: string 
  product: string
  totalPrice: string
  pic1: string
  dressSize: string
}

export default function Only_Sm_Show() {
  const [activeTab, setActiveTab] = useState("shop")
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [cartD, setCartD] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountMessage, setDiscountMessage] = useState("")

  const updateWishlistCount = () => {
    const storedWishlist = localStorage.getItem("wishList")
    const currentWishlist: WishlistItem[] = storedWishlist ? JSON.parse(storedWishlist) : []
    setWishlistItemsCount(currentWishlist.length)
  }

  const updateCartData = () => {
    const storedCart = localStorage.getItem("cart")
    const currentCart: CartItem[] = storedCart ? JSON.parse(storedCart) : []
    setCartD(currentCart)
  }

  useEffect(() => {
    updateWishlistCount()
    window.addEventListener("wishlistUpdated", updateWishlistCount)

    // Initial load of cart data
    updateCartData()
    // Listen for custom cart update event (e.g., when items are added/removed elsewhere)
    window.addEventListener("cartUpdated", updateCartData)

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount)
      window.removeEventListener("cartUpdated", updateCartData)
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
      count: cartD.length,
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

  const calculateTotal = () => {
    const baseTotal = cartD.reduce((sum, item) => sum + Number.parseFloat(item?.totalPrice || "0"), 0)
    if (discountApplied) {
      return (baseTotal * 0.9).toFixed(2) // Apply 10% discount
    }
    return baseTotal.toFixed(2)
  }

  const handleNavClick = (id: string, href: string, label: string) => {
    setActiveTab(id)
    console.log(`Navigating to ${href} - ${label}`)
    if (id === "cart") {
      updateCartData() // Fetch latest cart data immediately before opening the sheet
      setIsOpen(true)
    }
  }

const handleRemoveItem = (itemId: string) => {


  const updatedCart = cartD.filter((item) => {
    const itemIdStr = String(item._id).trim();
    const compareId = String(itemId).trim();
    const shouldKeep = itemIdStr !== compareId;
    console.log(`Comparing item.id: "${itemIdStr}" with itemId: "${compareId}" → keep: ${shouldKeep}`);
    return shouldKeep;
  });

  setCartD(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated")); 
};

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAKIB") {
      setDiscountApplied(true)
      setDiscountMessage("10% discount applied!")
    } else {
      setDiscountApplied(false)
      setDiscountMessage("Invalid promo code.")
    }
  }

  return (
    <>
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
                    <Icon className={`h-5 w-5 transition-colors`} style={iconStyle} />
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
          <Button variant="ghost" size="icon" className="sr-only">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Open cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[280px] sm:w-[320px] border-l border-border/40 flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-border/40 px-4 pt-6">
            <span className="pop600 text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Your Cart
            </span>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
            {cartD.length > 0 ? (
              cartD.map((item) => (
                 <Link to={`/allproduct/details/${item?._id}`} >
                <div key={item.id} className="flex items-center mt-2 gap-4 relative">
                  <img
                    src={item.pic1 || "/placeholder.svg"}
                    alt={item.product}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1 grid gap-0.5">
                    <h3 className="font-medium text-sm pop600">{item?.product}</h3>
                    <h3 className="font-medium text-sm pop600">Dress Size : {item?.dressSize}</h3>
                    <p className="text-gray-500 text-xs pop400">${item?.totalPrice}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-6 w-6 text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveItem(item._id)}
                    aria-label={`Remove ${item.product} from cart`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>
          <div className="border-t border-border/40 p-4">
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <Input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApplyPromoCode} style={{ backgroundColor: "#761A24", color: "white" }}>
                  Apply
                </Button>
              </div>
              {discountMessage && (
                <p className={`text-sm ${discountApplied ? "text-green-600" : "text-red-600"}`}>{discountMessage}</p>
              )}
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">${calculateTotal()}</span>
            </div>
            <Link to={"/order"}>
            <Button className="w-full" style={{ backgroundColor: "#761A24", color: "white" }}>
              Checkout
            </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
