         
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Clock } from 'lucide-react'; // Added Clock icon
import Footer from "../Footer/Footer";
import Only_Sm_Show from "../Nav/Only_Sm_Show";
import Nav from "../Nav/Nav";
import { useContext } from "react";
import { AuthContext } from "../loginRegistration_work/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPub from "../Axios/useAxiosPub";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS



interface Order {
  product: string;
  pic1?: string;
  dressSize?: string;
  quantity?: number;
  orna?: string;
  ornaPrice?: number;
  make?: string;
  inner?: string;
  description?: string;
  totalPrice?: number; // Added based on usage `o.totalPrice`
}

interface OrderGroup {
  _id: string;
  order: Order[];
  orderStatus?: string;
  totalTaka?: number;
  userNumber?: string;
  email?: string;
  address?: string;
  district?: string;
  division?: string;
  orderTime?: string;
}



export default function Component() {
  const auth = useContext(AuthContext); // Explicitly type useContext

  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { person } = auth;
  const axiosPublic = useAxiosPub();

  const { data, isLoading } = useQuery<OrderGroup[]>({ // Explicitly type useQuery data
    queryKey: ["myaccoutData", person?.email], // Add person?.email to queryKey for re-fetching on user change
    queryFn: async () => {
      if (!person?.email) { // Ensure email exists before making the request
        return [];
      }
      const res = await axiosPublic.get(`/orderData/${person.email}`);
      return res.data;
    },
    enabled: !!person?.email, // Only run query if person.email exists
  });

  const user = {
  
    email: person?.email || "N/A",
    avatar: person?.photoURL || "/placeholder.svg?height=80&width=80",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#761A24]/20 border-t-[#761A24] rounded-full animate-spin mx-auto"></div>
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-purple-200/30 border-b-purple-500 rounded-full animate-spin mx-auto mt-2 ml-2"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#761A24] to-purple-600 bg-clip-text text-transparent">
              Loading Orders
            </h3>
            <p className="text-gray-500">Fetching your order history...</p>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-[#761A24] rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-50">
        {/* Mobile-first padding with responsive adjustments */}
        <div className="px-3 py-4 sm:px-4 sm:py-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
            {/* User Info Card - Responsive layout */}
            <Card>
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                     Unknown Name
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground break-all sm:break-normal">
                      {user.email}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
            
            {/* Orders Card - Improved mobile layout */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="space-y-4 sm:space-y-6">
                  {data && data.length > 0 ? (
                    data?.flatMap((group) =>
                      group.order.map((o, index) => (
                        <div key={`${group._id}-${index}`}> {/* Unique key for each order item */}
                          <div className="space-y-3">
                            {/* Order header */}
                            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <span className="font-semibold text-sm sm:text-base">
                                  Order ID: {group._id}
                                </span>
                                <Badge
                                  className={`text-xs sm:text-sm px-2 py-1 
                                    ${group.orderStatus === "Order Accepted" ? "bg-yellow-500 text-white" : ""}
                                    ${group.orderStatus === "Waiting" ? "bg-gray-800 text-white" : ""}
                                    ${group.orderStatus === "delevery Done" ? "bg-green-600 text-white" : ""}
                                   
                                  `}
                                >
                                  {group.orderStatus || "Unknown Status"}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                <span>Ordered: {group.orderTime}</span>
                              </div>
                            </div>
                            
                            {/* Order details */}
                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                                <span>Pajama</span>
                                <span className="h-3  sm:h-4  flex-shrink-0 pop600">
                                  {o.make || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                                <span>Orna</span>
                                <span className="h-3 sm:h-4  flex-shrink-0 pop600">
                                  {o.orna || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                                <span>Orna</span>
                                <span className="h-3 w-3 sm:h-4  flex-shrink-0 pop600">
                                  {o.inner || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                                <span>Total Price</span>
                                <span className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 pop600">
                                  ৳{o.totalPrice || 0}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">

                                <span>Qty:</span>
                                <span className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 pop600">
                                   {o.quantity || 1}
                                </span>
                                
                              </div>
                            </div>
                            
                            {/* Items */}
                            <div className="text-xs sm:text-sm pop600">
                              <span className="text-muted-foreground ">
                                Items:{" "}
                              </span>
                              <span className="break-words">{o.product || "N/A"}</span>
                            </div>
                            <div className="text-xs sm:text-sm pop600">
                              <span className="text-muted-foreground ">
                                Phone :{" "}
                              </span>
                              <span className="break-words">
                                {group.userNumber || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs sm:text-sm pop600 mt-4">
                            <img
                              className="h-[100px] w-[100px] object-cover rounded-md"
                              src={o?.pic1 || "/placeholder.svg?height=100&width=100&query=product image"}
                              alt={o.product || "Product image"}
                            />
                          </div>
                          <Separator className="mt-4 sm:mt-6" />
                        </div>
                      ))
                    )
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No orders found for this account.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
      <Only_Sm_Show />
      <ToastContainer /> {/* Add ToastContainer here */}
    </>
  );
}
