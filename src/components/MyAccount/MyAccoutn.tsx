import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Calendar } from "lucide-react";
import Footer from "../Footer/Footer";
import Only_Sm_Show from "../Nav/Only_Sm_Show";
import Nav from "../Nav/Nav";
import { useContext } from "react";
import { AuthContext } from "../loginRegistration_work/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPub from "../Axios/useAxiosPub";

export default function Component() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { person } = auth;

  const axiosPublic = useAxiosPub();
  const { data } = useQuery({
    queryKey: ["myaccoutData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/orderData/${person?.email}`);
      return res.data;
    },
  });
  console.log(data, "my account");

  const user = {
    name: "Unknown",
    email: person?.email,
    avatar: "/placeholder.svg?height=80&width=80",
  };

 

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
                  <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto sm:mx-0">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-sm sm:text-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left w-full sm:w-auto">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                      {user.name}
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
                  {data?.flatMap((group) =>
                    group.order.map((o, index) => (
                      <div key={index}>
                        <div className="space-y-3">
                          {/* Order header */}
                          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="font-semibold text-sm sm:text-base">
                                {group._id}
                              </span>
                              <Badge className="text-xs sm:text-sm px-2 py-1">
                                {group.orderStatus}
                              </Badge>
                            </div>
                          </div>

                          {/* Order details */}
                          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span>{group.orderTime}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                            
                              <span className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 pop600">
                                ৳{o.totalPrice}
                              </span>
                            </div>
                          </div>

                          {/* Items */}
                          <div className="text-xs sm:text-sm pop600">
                            <span className="text-muted-foreground ">
                              Items:{" "}
                            </span>
                            <span className="break-words">{o.product}</span>
                          </div>
                          <div className="text-xs sm:text-sm pop600">
                            <span className="text-muted-foreground ">
                              Phone :{" "}
                            </span>
                            <span className="break-words">{group.userNumber}</span>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm pop600 mt-4">
                            <img className="h-[100px] w-[100px]" src={o?.pic1} alt="" />
                          </div>
                        <Separator className="mt-4 sm:mt-6" />
                        
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats - Responsive grid */}
            {/* <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Card className="lg:col-span-1">
                <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                      {orders.length}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Total Orders
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="xs:col-span-2 lg:col-span-1">
                <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                      {
                        orders.filter((order) => order.status === "Delivered")
                          .length
                      }
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Delivered
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
      <Only_Sm_Show />
    </>
  );
}
