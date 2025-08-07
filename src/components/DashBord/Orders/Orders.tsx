"use client";

import type React from "react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer/Footer";
import Only_Sm_Show from "@/components/Nav/Only_Sm_Show";
import Nav from "@/components/Nav/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPub from "@/components/Axios/useAxiosPub";

interface CartItem {
  _id: string; // Changed from 'id' to '_id' to match your usage
  product: string;
  totalPrice: string;
  pic1: string;
  dressSize: string;
  inner?: boolean;
  make?: string;
  ornaPrice?: string;
}

// Define interface for the data sent to the backend
interface OrderFormData {
  userNumber: string;
  name: string;
  email: string;
  district: string;
  division: string;
  address: string;
  productDescription: string;
  order: CartItem[];
  totalTaka: number;
}

export default function Orders() {
  const [cartD, setCartD] = useState<CartItem[]>([]);
  // const [promoCode, setPromoCode] = useState(""); // State for promo code input
  const [discountApplied, setDiscountApplied] = useState(false); // State for discount status
  // const [discountMessage, setDiscountMessage] = useState(""); // State for discount message

  const [formData, setFormData] = useState({
    userNumber: "",
    name: "",
    email: "",
    district: "",
    division: "",
    address: "",
    productDescription: "",
    // 'order' will be added dynamically in handleSubmit
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Placeholder data for districts and divisions
  const divisions = [
    "Dhaka",
    "Chittagong",
    "Khulna",
    "Rajshahi",
    "Sylhet",
    "Barisal",
    "Rangpur",
    "Mymensingh",
  ];
  const districts = [
    "Dhaka",
    "Gazipur",
    "Narayanganj",
    "Chittagong",
    "Cox's Bazar",
    "Sylhet",
    "Khulna",
    "Rajshahi",
  ];

  //=============================================================================//
  useEffect(() => {
    const store = localStorage.getItem("cart");
    const d: CartItem[] = store ? JSON.parse(store) : [];
    setCartD(d);
  }, []);
  console.log(cartD, "Oder");

  // Calculate total price, applying discount if applicable
  const totalTaka =
    cartD?.reduce(
      (acc, item: CartItem) => acc + Number(item.totalPrice || "0"),
      0
    ) * (discountApplied ? 0.9 : 1) || 0;

  // Promo code application logic
  // const handleApplyPromoCode = () => {
  //   if (promoCode.toUpperCase() === "SAKIB") {
  //     setDiscountApplied(true);
  //     setDiscountMessage("10% discount applied!");
  //   } else {
  //     setDiscountApplied(false);
  //     setDiscountMessage("Invalid promo code.");
  //   }
  // };

  //=============================================================================//
  const navigate = useNavigate();
  const axiospub = useAxiosPub();

  const mutationUp = useMutation<unknown, Error, OrderFormData>({
    mutationFn: async (data: OrderFormData) => {
      const res = await axiospub.post("/order", data);
      return res.data;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullData: OrderFormData = {
      ...formData,
      order: cartD, // Attach current cart items
      totalTaka: totalTaka, // Attach calculated total
    };

    Swal.fire({
      title: "Make Order Now.",
      text: "After Confirming our managers will contact with you.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, order now!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutationUp.mutate(fullData);
        localStorage.removeItem("cart"); // Clear only the cart from local storage
        setCartD([]); // Clear cart state immediately
        navigate("/");
        Swal.fire({
          title: "Order Done!",
          text: "We will contact soon.",
          icon: "success",
        });
      }
    });
    console.log("Order Form Data:", fullData);
    // Reset form data, but ensure order is empty after submission
    setFormData({
      userNumber: "",
      email: "",
      name: "",
      district: "",
      division: "",
      address: "",
      productDescription: "",
    });
    // setPromoCode(""); // Reset promo code input
    setDiscountApplied(false); // Reset discount status
    // setDiscountMessage(""); // Reset discount message
  };

  return (
    <>
      <Nav></Nav>
      <div className="flex flex-col md:flex-col lg:flex-row p-2 md:p-10 lg:p-10 justify-between">
        <div className="w-full">
          <h1 className="pop600 text-4xl">ORDER ITEMS</h1>
          <hr className="w-full mb-2" />
          <div>
            {cartD?.map((i: CartItem, x) => {
              return (
                <div key={x}>
                  <Link to={`/allproduct/details/${i?._id}`}>
                    {" "}
                    <Card className="w-full max-w-md mb-2">
                      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 ">
                        {/* Image Section */}
                        <div className="flex-shrink-0">
                          <img
                            src={
                              i?.pic1 ||
                              "/placeholder.svg?height=100&width=100&query=product"
                            }
                            width={100}
                            height={100}
                            className="rounded-md object-cover aspect-square"
                            alt={i?.product || "Product image"}
                          />
                        </div>
                        {/* Product Details Section */}
                        <div className="flex-1 grid gap-1">
                          <CardTitle className="text-lg font-semibold">
                            {i?.product}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Size: {i?.dressSize}
                          </p>
                          {i?.inner ? <h1>+ Inner</h1> : null}
                          {i?.make ? <h1>+ {i?.make}</h1> : null}
                          {i?.ornaPrice ? <h1>+ Orna</h1> : null}
                          <p className="text-md font-bold text-gray-800 dark:text-gray-200">
                            Total Price: ${i?.totalPrice}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
          <hr className="my-8 lg:my-10" />
         
          <h1 className="text-2xl pop600 text-[#761A24] text-center">
            Total Price : ৳ {totalTaka.toFixed(2)}
          </h1>
        </div>
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
          <Card className="w-full max-w-2xl lg:min-w-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center pop600">
                Place Your Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <div className="space-y-2 pop400">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2 pop400">
                  <Label htmlFor="userNumber">User Number</Label>
                  <Input
                    id="userNumber"
                    type="text"
                    placeholder="Enter your user number"
                    value={formData.userNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2 pop400">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 pop400">
                  <Label htmlFor="division">Division</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("division", value)
                    }
                    value={formData.division}
                  >
                    <SelectTrigger id="division">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((div) => (
                        <SelectItem key={div} value={div}>
                          {div}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 pop400">
                  <Label htmlFor="district">District</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("district", value)
                    }
                    value={formData.district}
                  >
                    <SelectTrigger id="district">
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((dist) => (
                        <SelectItem key={dist} value={dist}>
                          {dist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2 pop400">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your full address including street, house number, etc."
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2 sm:col-span-2 pop400">
                  <Label htmlFor="productDescription">
                    Product Details / Special Instructions
                  </Label>
                  <Textarea
                    id="productDescription"
                    placeholder="Describe the product you are ordering or any special instructions (e.g., color, size, quantity, specific model)."
                    value={formData.productDescription}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <p className="text-md font-bold pop400 text-gray-800 dark:text-gray-200 sm:col-span-2">
                  Total Price: ৳{totalTaka.toFixed(2)}
                </p>
                <div className="sm:col-span-2 pop400">
                  <Button
                    type="submit"
                    className="w-full"
                    style={{ backgroundColor: "#761A24", color: "white" }}
                  >
                    Place Order
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer></Footer>
      <Only_Sm_Show></Only_Sm_Show>
    </>
  );
}
