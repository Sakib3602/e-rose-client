"use client";

import type React from "react";

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

export default function Orders() {
  const [formData, setFormData] = useState({
    userNumber: "",
    name: "",
    email: "",
    district: "",
    division: "",
    address: "",
    productDescription: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order Form Data:", formData);
    // Here you would typically send this data to your backend
    alert("Order submitted! Check console for data.");
    // Optionally reset form
    setFormData({
      userNumber: "",
      email: "",
      name: "",
      district: "",
      division: "",
      address: "",
      productDescription: "",
    });
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
  const [cartD, setCartD] = useState([]);

  useEffect(() => {
    const store = localStorage.getItem("cart");
    const d = store ? JSON.parse(store) : [];
    setCartD(d);
  }, []);

  console.log(cartD, "Oder");

 const totalTaka = cartD?.reduce((acc, item) => acc + Number(item.totalPrice), 0) || 0


  //=============================================================================//

  return (
    <>
      <Nav></Nav>

      <div className="flex flex-col md:flex-col lg:flex-row p-2 md:p-10 lg:p-10 justify-between">
        <div className="w-full">
          <h1 className="pop600 text-4xl">ORDER ITEMS</h1>
          <hr className="w-full mb-2" />
          <div>
            {cartD?.map((i, x) => {
              return (
                <div key={x}>
                  <Card className="w-full max-w-md  mb-2">
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
                        {
                          i?.inner ? <h1>+ Inner</h1> : null
                        }
                        {
                          i?.make ? <h1>+ {i?.make}</h1> : null
                        }
                        {
                          i?.ornaPrice ? <h1>+ Orna</h1> : null
                        }
                        <p className="text-md font-bold text-gray-800 dark:text-gray-200">
                          Total Price: ${i?.totalPrice}
                        </p>

                        

                        {/* Add-ons List */}
                     
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
          <hr  className="my-8 lg:my-10"/>
          <h1 className="text-2xl pop600 text-[#761A24] text-center">Total Price : ৳ {totalTaka}</h1>
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
                  <Label htmlFor="userNumber">User Number</Label>
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

                       <p className="text-md font-bold pop400 text-gray-800 dark:text-gray-200">
                          Total Price: ৳{totalTaka}
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
