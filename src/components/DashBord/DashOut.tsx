import type React from "react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  X,
  Home,
  Package,
  Users,
  
  FileCheck,
  Loader,
  BarChart3,
  Settings,
  Bell,
  Shirt,
  FilePlus2,
  ListOrdered
} from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../loginRegistration_work/AuthProvider/AuthProvider";

const DashOut: React.FC = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { person, loading } = auth;
  const navigate = useNavigate();
  
  useEffect(() => {
  if (!person) {
    navigate("/login");
  }
}, [person, navigate]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, loc: "" },
    { id: "products", label: "Products", icon: Package, loc: "allPro" },
    { id: "orders", label: "Watting Orders", icon: Loader, loc: "order" },
    { id: "orders", label: "Accepted Orders", icon: ListOrdered, loc: "Acceptorder" },
    { id: "Doneorders", label: "Delevery Done", icon: FileCheck, loc: "Doneorder" },
    { id: "Add Item", label: "Add Item", icon: FilePlus2, loc: "addItem" },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  if (loading) {
  return <div>Loading...</div>; // or a spinner
}


  return (
    <div className="flex h-screen bg-white ">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:inset-0`}
      >
        {/* Sidebar Header */}
        <Link to={"/"}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#761A24" }}
              >
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">RoseWood</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={`/dashbord/${item?.loc}`}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 mb-1 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-[#761A24] text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                // className="flex items-center px-3 py-3 mb-1 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <Icon className="h-5 w-5 mr-3 text-white-500 group-hover:text-white-700" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Admin User
              </p>
              <p className="text-xs text-gray-500 truncate">
                admin@stylehub.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6">
          {/* Left side - Menu button and Search */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center w-full space-x-4 justify-between">
            <div className="flex md:hidden lg:hidden items-center space-x-3 ">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#761A24" }}
              >
                <Shirt className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">RoseWood</h1>
            </div>
            <div className="hidden  md:flex lg:flex items-center space-x-3 ">
              <h1 className="text-xl font-bold text-gray-900">WelCome Admin</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet></Outlet>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashOut;
