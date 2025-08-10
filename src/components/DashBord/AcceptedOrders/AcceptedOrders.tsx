import useAxiosSec from "@/components/Axios/useAxiosSec";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Badge,
  Clock,
  DollarSign,
  Eye,
  Mail,
  MapPin,
  MoreVertical,
  Package,
  Phone,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import moment from "moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface OrderGroup {
  _id: string;
  order: Order[];
  name: string;
  orderStatus?: string;
  totalTaka?: number;
  userNumber?: string;
  email?: string;
  address?: string;
  district?: string;
  division?: string;
  orderTime?: string;
  doneDate: string;
}
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
}

interface UpdateOrderParams {
  id: string;
  status: string;
  doneDate: string;
}

const AcceptedOrders = () => {
  const axiosSec = useAxiosSec();
  const handleDoneStatus = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure user get product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      const dateee = moment().format("MMMM Do YYYY, h:mm:ss a");
      if (result.isConfirmed) {
        mutationUp.mutate({ id, status: "delevery Done", doneDate: dateee });
        Swal.fire({
          title: "Congratulations!",
          text: "Order is deleverd succesfully.",
          icon: "success",
        });
      }
    });
  };

  const mutationUp = useMutation<any, Error, UpdateOrderParams>({
    mutationFn: async ({ id, status, doneDate }: UpdateOrderParams) => {
      const res = await axiosSec.patch(`/ordersAll/${id}`, {
        status,
        doneDate,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Order status updated successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to update order status");
    },
  });

  const { data, isLoading, refetch } = useQuery<OrderGroup[]>({
    queryKey: ["adminuserdata"],
    queryFn: async () => {
      const res = await axiosSec.get("/ordersAll");
      return res.data;
    },
  });


  
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
            <p className="text-gray-500">Fetching the latest order data...</p>
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

  const filterData = data?.filter((x) => x?.orderStatus === "Order Accepted");
  console.log(filterData[0].orderStatus, "alll");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-3 sm:p-4 lg:p-6 xl:p-8">
        <div className="max-w-8xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-[#761A24] to-purple-600 rounded-xl sm:rounded-2xl shadow-lg">
                      <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-[#761A24] to-purple-600 bg-clip-text text-transparent">
                      Accepted Orders
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      Advanced order management & analytics
                    </p>
                  </div>
                </div>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:min-w-[400px]">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white text-center">
                    <div className="text-lg sm:text-2xl font-bold">
                      {filterData?.length || 0}
                    </div>
                    <div className="text-xs sm:text-sm opacity-90">
                      Total Orders
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="space-y-4 sm:space-y-6">
            {filterData?.flatMap((group, groupIndex) =>
              group.order.map((order, orderIndex) => (
                <Card
                  key={`${group._id}-${orderIndex}`}
                  className="overflow-hidden bg-white/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] rounded-2xl sm:rounded-3xl"
                >
                  {/* Mobile-First Header */}
                  <CardHeader className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 border-b border-gray-100/50 p-4 sm:p-6">
                    <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <div className="relative">
                          <div className="p-2 sm:p-3 bg-gradient-to-br from-[#761A24] to-purple-600 rounded-xl shadow-lg">
                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border border-white"></div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                            {order?.product || "Unknown Product"}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            Order #{groupIndex + 1}-{orderIndex + 1}
                          </p>
                        </div>
                      </CardTitle>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Badge className="px-3 py-1.5 text-xs sm:text-sm font-medium border-0 shadow-lg flex items-center gap-1.5">
                          {group?.orderStatus || "pending"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 hover:bg-gray-100 rounded-xl"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    {/* Mobile Stack Layout */}
                    <div className="block lg:hidden">
                      {/* Product Image - Full Width on Mobile */}
                      <div className="relative h-48 sm:h-64">
                        <img
                          src={order?.pic1 || "/placeholder.svg"}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-2xl font-bold text-[#761A24]">
                              ৳{group?.totalTaka || 0}
                            </div>
                            <div className="text-sm text-gray-600">
                              Total Amount
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Content */}
                      <div className="p-4 space-y-4">
                        {/* Product Details */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Package className="h-4 w-4 text-[#761A24]" />
                            Product Details
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-white/70 rounded-lg p-2">
                              <div className="text-gray-600 text-xs">Size</div>
                              <div className="font-medium">
                                {order?.dressSize || "Standard"}
                              </div>
                            </div>
                            <div className="bg-white/70 rounded-lg p-2">
                              <div className="text-gray-600 text-xs">Qty</div>
                              <div className="font-medium">
                                {order?.quantity || 1}
                              </div>
                            </div>
                            <div className="bg-white/70 rounded-lg p-2">
                              <div className="text-gray-600 text-xs">Orna</div>
                              <div className="font-medium">
                                {order?.orna || "No"}
                              </div>
                            </div>
                            <div className="bg-white/70 rounded-lg p-2">
                              <div className="text-gray-600 text-xs">Inner</div>
                              <div className="font-medium">
                                {order?.inner || "No"}
                              </div>
                            </div>
                            <div className="bg-white/70 col-span-2 rounded-lg p-2">
                              <div className="text-gray-600 text-xs">
                                Pajama
                              </div>
                              <div className="font-medium">
                                {order?.make || "No"}
                              </div>
                            </div>
                            <div className="bg-white/70 col-span-2 rounded-lg p-2">
                              <Clock className="h-4 w-4" />
                              <span className="text-gray-600 text-x">
                                Ordered: {group?.orderTime || "N/A"}
                              </span>
                            </div>
                            <div className="bg-white/70 col-span-2 rounded-lg p-2">
                              <Clock className="h-4 w-4" />
                              <span className="text-gray-600 text-x">
                                Done Order At: {group?.doneDate || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="bg-gradient-to-br from-[#761A24] to-purple-600 rounded-xl p-4 text-white">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Customer
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                              <User className="h-4 w-4 opacity-80" />
                              <span>{group?.name || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                              <Phone className="h-4 w-4 opacity-80" />
                              <span>{group?.userNumber || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                              <Mail className="h-4 w-4 opacity-80" />
                              <span className="truncate text-xs">
                                {group?.email || "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-600" />
                            Delivery
                          </h4>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p className="bg-white/70 rounded-lg p-2">
                              {group?.address || "N/A"}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-white/70 rounded-lg p-2">
                                <div className="text-xs text-gray-500">
                                  District
                                </div>
                                <div className="font-medium">
                                  {group?.district || "N/A"}
                                </div>
                              </div>
                              <div className="bg-white/70 rounded-lg p-2">
                                <div className="text-xs text-gray-500">
                                  Division
                                </div>
                                <div className="font-medium">
                                  {group?.division || "N/A"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:block p-6">
                      <div className="grid grid-cols-12 gap-6">
                        {/* Product Image */}
                        <div className="col-span-3">
                          <div className="relative group">
                            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 shadow-lg">
                              <img
                                src={order?.pic1 || "/placeholder.svg"}
                                alt="Product"
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="col-span-5 space-y-4">
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <Package className="h-5 w-5 text-[#761A24]" />
                              Product Specifications
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                {
                                  label: "Dress Size",
                                  value: order?.dressSize || "Standard",
                                },
                                {
                                  label: "Quantity",
                                  value: order?.quantity || 1,
                                },
                                { label: "Orna", value: order?.orna || "No" },
                                {
                                  label: "Orna Price",
                                  value: `৳${order?.ornaPrice || 0}`,
                                },
                                {
                                  label: "Pajama",
                                  value: order?.make || "No",
                                },
                                {
                                  label: "Inner",
                                  value: order?.inner || "No",
                                },
                              ].map((item, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white/80 rounded-xl p-3 hover:bg-white transition-colors"
                                >
                                  <div className="text-xs text-gray-500 mb-1">
                                    {item.label}
                                  </div>
                                  <div className="font-semibold text-gray-900">
                                    {item.value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {order?.description && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5">
                              <h4 className="font-semibold text-gray-900 mb-3">
                                Special Instructions
                              </h4>
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {order.description}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Customer & Order Info */}
                        <div className="col-span-4 space-y-4">
                          {/* Customer Info */}
                          <div className="bg-gradient-to-br from-[#761A24] to-purple-600 rounded-2xl p-5 text-white">
                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                              <User className="h-5 w-5" />
                              Customer Information
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                                <User className="h-4 w-4 opacity-80" />
                                <span className="font-medium">
                                  {group?.name || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                                <Phone className="h-4 w-4 opacity-80" />
                                <span className="font-medium">
                                  {group?.userNumber || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                                <Mail className="h-4 w-4 opacity-80" />
                                <span className="text-sm break-all">
                                  {group?.email || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Delivery Info */}
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <MapPin className="h-5 w-5 text-green-600" />
                              Delivery Address
                            </h4>
                            <div className="space-y-3 text-sm text-gray-700">
                              <div className="bg-white/80 rounded-xl p-3">
                                <div className="font-medium">
                                  {group?.address || "N/A"}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/80 rounded-xl p-3">
                                  <div className="text-xs text-gray-500 mb-1">
                                    District
                                  </div>
                                  <div className="font-medium">
                                    {group?.district || "N/A"}
                                  </div>
                                </div>
                                <div className="bg-white/80 rounded-xl p-3">
                                  <div className="text-xs text-gray-500 mb-1">
                                    Division
                                  </div>
                                  <div className="font-medium">
                                    {group?.division || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-5">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <DollarSign className="h-5 w-5 text-yellow-600" />
                              Order Summary
                            </h4>
                            <div className="space-y-3">
                              <div className="bg-white/80 rounded-xl p-4 text-center">
                                <div className="text-3xl font-bold text-[#761A24] mb-1">
                                  ৳{group?.totalTaka || 0}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Total Amount
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/50 rounded-xl p-3">
                                <Clock className="h-4 w-4" />
                                <span>
                                  Ordered: {group?.orderTime || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="mx-4 sm:mx-6" />

                    {/* Action Buttons - Responsive */}
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                        <Button
                          size="sm"
                          className="bg-green-500 text-white"
                          onClick={() => handleDoneStatus(group?._id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Done Delevery
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Enhanced Empty State */}
          {(!filterData || filterData.length === 0) && !isLoading && (
            <Card className="text-center py-16 bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl">
              <CardContent>
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full">
                      <Package className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Search className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      No Delevary Done Orders Found
                    </h3>
                    <p className="text-gray-500 max-w-md">
                      There are no delevery done orders to display at the
                      moment. Done Orders will appear here once customers start
                      placing them.
                    </p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-[#761A24] to-purple-600 hover:from-[#8B1E2A] hover:to-purple-700 text-white rounded-xl px-6 py-3"
                    onClick={() => refetch()}
                  >
                    Refresh Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcceptedOrders;
