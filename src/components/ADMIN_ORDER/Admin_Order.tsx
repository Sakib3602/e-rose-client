import useAxiosSec from "../Axios/useAxiosSec";
import { useQuery } from "@tanstack/react-query";

const Admin_Order = () => {
  const axiosSec = useAxiosSec();

  const { data, isLoading } = useQuery({
    queryKey: ["adimnuserdata"],
    queryFn: async () => {
      const res = await axiosSec.get("/ordersAll");
      return res.data;
    },
  });

  console.log(data,"orders")

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {data?.flatMap((group) =>
        group.order.map((x, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg p-4 gap-4 items-start sm:items-center"
          >
            {/* Image */}
            <div className="w-full sm:w-[120px] h-[120px] flex-shrink-0 rounded-md overflow-hidden border">
              <img
                src={x?.pic1 || "https://via.placeholder.com/120"}
                alt="Product"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Order Info */}
            <div className="flex-1 space-y-2 text-sm sm:text-base pop400">
              <div className="font-semibold text-lg">
                Product Name: {x?.product}
              </div>
              <div className="">
                Dress Size : {x?.dressSize || "NO"}
              </div>
              <div className="">
                Orna : {x?.orna || "NO"}
              </div>
              <div className="">
                Orna Price : {x?.ornaPrice || "0"}
              </div>
              <div className="">
                Pajama : {x?.make || "NO"}
              </div>
              <div className="">
                Inner : {x?.inner || "NO"}
              </div>
              <div className="">
                Quantity : {x?.quantity || "NO"}
              </div>
              <div className="">
                Product Description: {x?.description || "No description provided"}
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 ">
                <div>Place Description:  <span className="text-lg">{group?.address || "N/A"}</span></div>
                <div>District: {group?.district || "N/A"}</div>
                <div>Division: {group?.division || "N/A"}</div>
                <div className="text-lg text-[#761A24]">User Phone: {group?.userNumber || "N/A"}</div>
                <div className="text-sm text-[#761A24]">User email: {group?.email || "N/A"}</div>
                <div>Price: ৳{group?.totalTaka || 0}</div>
                <div>Order Time: {group?.orderTime || "N/A"}</div>
              </div>
            </div>

            {/* Status Button */}
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <button onClick={()=> console.log(group.orderStatus)} className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
                Change Status
              </button>
            </div>
            <div className=" sm:mt-0 sm:ml-4">
              <button onClick={()=> console.log(group.orderStatus)} className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
                Delete Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin_Order;
