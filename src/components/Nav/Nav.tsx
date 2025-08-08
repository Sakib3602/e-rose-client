"use client";

import {
  Menu,
  ShoppingCart,
  Star,
  Home,
  Grid3X3,
  Heart,
  X,
  User
} from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
// import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";
import { AuthContext } from "../loginRegistration_work/AuthProvider/AuthProvider";
import useAxiosSec from "../Axios/useAxiosSec";
import { useQuery } from "@tanstack/react-query";

interface CartItem {
  _id: string;
  id: string;
  product: string;
  totalPrice: string;
  pic1: string;
  dressSize: string;
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false); // State for main mobile navigation sheet
  const [isCartOpen, setIsCartOpen] = useState(false); // State for the new cart sidebar sheet
  const [cartD, setCartD] = useState<CartItem[]>([]); // State for cart items (using cartD as per previous working version)
  // const [promoCode, setPromoCode] = useState("")
  // const [discountApplied, setDiscountApplied] = useState(false)
  // const [discountMessage, setDiscountMessage] = useState("")

  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within an AuthProvider");
  const { person } = auth;

  console.log("nav", person); // Keep this console log as requested

  const axiosSec = useAxiosSec();
  const { data } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSec.get(`/user/${person?.email}`);
      return res.data;
    },
    enabled: !!person?.email, // Only run query if person.email exists
  });

  const updateCartData = () => {
    const storedCart = localStorage.getItem("cart");
    const currentCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
    setCartD(currentCart);
  };

  console.log(cartD, "nav cart"); // Keep this console log as requested

  useEffect(() => {
    // Initial load of cart data
    updateCartData();
    // Listen for custom cart update event (e.g., when items are added/removed elsewhere)
    window.addEventListener("cartUpdated", updateCartData);
    return () => {
      window.removeEventListener("cartUpdated", updateCartData);
    };
  }, []);

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Products", href: "/allproduct", icon: Grid3X3 },
    { name: "Cart", href: "", icon: ShoppingCart },

    { name: "Wish List", href: "/wish", icon: Heart },
    { name: "Reviews", href: "/review", icon: Star },
    ...(data?.role === "admin"
      ? [{ name: "Dashboard", href: "/dashbord", icon: Star }]
      : []),
    ...(data?.role === "user"
      ? [{ name: "My Account", href: "/account", icon: User }]
      : []),
  ];

  const calculateTotal = () => {
    const baseTotal = cartD.reduce(
      (sum, item) => sum + Number.parseFloat(item?.totalPrice || "0"),
      0
    );

    return baseTotal.toFixed(2);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  const handleCartClick = () => {
    setIsOpen(false); // Close main mobile nav if open
    updateCartData(); // Fetch latest cart data immediately before opening the cart sheet
    setIsCartOpen(true); // Open cart sidebar
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cartD.filter((item) => {
      console.log(`Comparing item.id: "${item._id}" with itemId: "${itemId}"`);
      return item._id !== itemId;
    });

    console.log(
      "Updated cart after filter:",
      JSON.parse(JSON.stringify(updatedCart))
    );
    console.log("--- End handleRemoveItem ---");

    setCartD(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated")); // Dispatch event to update count in nav bar
  };

  return (
    <header className=" sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Main header content container */}
      <div className="flex h-16 items-center justify-between px-4 w-full">
        {/* Left side: RoseWood Logo */}
        <p  className="flex items-center space-x-3 group pop400">
        <Link to={"/"}>
        <span className="pop600 font-bold text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
            RoseWood
          </span>
        </Link>
          
        </p>
        {/* Right side: Group for Desktop Nav and Mobile Trigger */}
        <div className="flex items-center">
          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 pop400">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              if (item.name === "Cart") {
                // For "Cart" on desktop, use a button to open the Cart Sheet
                return (
                  <button
                    key={item.name}
                    onClick={handleCartClick} // Open the cart sheet
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
                  >
                    <Icon
                      className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                      strokeWidth={2}
                    />
                    <span className="relative font-semibold tracking-wide after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
                      {item.name}
                      {cartD.length > 0 && (
                        <Badge
                          className="absolute -top-1 -right-2 h-4 w-4 p-0 rounded-full flex items-center justify-center text-xs"
                          style={{
                            backgroundColor: "#761A24",
                            color: "white",
                          }}
                        >
                          {cartD.length}
                        </Badge>
                      )}
                    </span>
                  </button>
                );
              }
              // For other items on desktop, use Link for navigation
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
                >
                  <Icon
                    className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={2}
                  />
                  <span className="relative font-semibold tracking-wide after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
          {/* Main Mobile Navigation (Sheet) */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden border-border/40 bg-transparent hover:bg-accent/50 transition-all duration-200"
              >
                <Menu className="h-5 w-5" strokeWidth={2} />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            {/* Adjusted width for responsiveness and added p-4 for consistent padding */}
            <SheetContent
              side="right"
              className="w-[min(80vw,280px)] border-l border-border/40 flex flex-col p-4"
            >
              {/* Header for the mobile sheet */}
              <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <span className="pop400 text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                  RoseWood
                </span>
              </div>
              {/* Navigation links - added mt-4 for spacing from header */}
              <nav className="flex flex-col space-y-2 pop400 mt-4">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={
                        item.name === "Cart"
                          ? handleCartClick
                          : handleNavLinkClick
                      } // Special handling for Cart
                      className="flex items-center space-x-4 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-all duration-200 hover:bg-accent/50 group"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/50 transition-all duration-200">
                        <Icon
                          className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                          strokeWidth={2}
                        />
                      </div>
                      <span className="relative font-semibold tracking-wide after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Cart Sidebar (Sheet) - This is an overlay, it can stay outside the main header div */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          {/* This trigger is intentionally empty as it's opened programmatically */}
          <Button variant="ghost" size="icon" className="sr-only">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Open cart</span>
          </Button>
        </SheetTrigger>
        {/* Added z-50 for higher z-index */}
        <SheetContent
          side="right"
          className="w-[min(80vw,320px)] border-l border-border/40 flex flex-col z-50"
        >
          <div className="flex items-center justify-between pb-2 border-b border-border/40 px-4 pt-6">
            <span className="pop600 text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Your Cart
            </span>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
            {cartD.length > 0 ? (
              cartD.map((item) => (
                <Link to={`/allproduct/details/${item?._id}`}>
                  <div
                    key={item.id}
                    className="flex items-center mt-2 gap-4 relative"
                  >
                    <img
                      src={item.pic1 || "/placeholder.svg"}
                      alt={item.product}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1 grid gap-0.5">
                      <h3 className="font-medium text-sm pop600">
                        {item?.product}
                      </h3>
                      <h3 className="font-medium text-sm pop600">
                        Dress Size : {item?.dressSize}
                      </h3>
                      <p className="text-gray-500 text-xs pop400">
                        ${item?.totalPrice}
                      </p>
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
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">${calculateTotal()}</span>
            </div>
            <Link to={"/order"}>
              <Button
                className="w-full"
                style={{ backgroundColor: "#761A24", color: "white" }}
              >
                Checkout
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
