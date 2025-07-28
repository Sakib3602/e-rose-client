"use client";

import {
  Menu,
  ShoppingCart,
  Star,
  Package,
  Home,
  Grid3X3,
  
} from "lucide-react";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { AuthContext } from "../loginRegistration_work/AuthProvider/AuthProvider";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const {person} = useContext(AuthContext)
  console.log("nav", person)

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Products", href: "/allproduct", icon: Grid3X3 },
    { name: "Cart", href: "/cart", icon: ShoppingCart },
    { name: "Order", href: "/order", icon: Package },
    { name: "Reviews", href: "/review", icon: Star },
    { name: "DashBord", href: "/dashbord", icon: Star },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className=" sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Enhanced Logo */}
        <a href="/" className="flex items-center space-x-3 group pop400">
          <span className="pop600 font-bold text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
            RoseWood
          </span>
        </a>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 pop400">
          {navigationItems.map((item) => {
            const Icon = item.icon;
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

        {/* Enhanced Mobile Navigation */}
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
         
          <SheetContent
            side="right"
            className="w-[220px] sm:w-[200px] border-l border-border/40"
          >
            <div className="flex flex-col space-y-2 mt-6 ">
              <div className="flex items-center justify-between pb-2 border-b border-border/40 ml-4 mt-4">
                <div className="flex items-center space-x-3">
                  <span className="pop400  text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                    RoseWood
                  </span>
                </div>
              </div>

              <nav className="flex flex-col space-y-2 pop400">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={handleLinkClick}
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
                    </a>
                  );
                })}
              </nav>
            </div>
          </SheetContent>
          
        </Sheet>
        
      </div>
    </header>
  );
}
