import useAxiosSec from "@/components/Axios/useAxiosSec";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AdminProduct = () => {
  const axiosSec = useAxiosSec();
  const { data, isLoading , refetch} = useQuery({
    queryKey: ["adminuserdata"],
    queryFn: async () => {
      const res = await axiosSec.get("/allData");
      return res.data;
    },
  });
  const handleDelete = (id : string)=>{
     Swal.fire({
          title: "Are you sure?",
          text: "Are you to delete this product!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            mutationUpp.mutate(id);
            Swal.fire({
              title: "Product Deleted!",
              text: "Product deleted succesfully.",
              icon: "success",
            });
          }
        });

  }

  const mutationUpp = useMutation({
    mutationFn : async(id)=>{
        const res = await axiosSec.delete(`/allData/${id}`)
        return res.data;
    },
    onSuccess: ()=>{
        refetch()
    }
  })

  if (isLoading) {
    return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
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
              Loading Data
            </h3>
            <p className="text-gray-500">Fetching the latest data...</p>
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
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((x: any, i: number) => (
        <div
          key={i}
          className="max-w-xs rounded-md shadow-md bg-white text-gray-800"
        >
          <img
            src={x?.pic1}
            alt="Product"
            className="object-cover object-center w-full rounded-t-md h-72 bg-gray-200"
          />
          <div className="flex flex-col justify-between p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-center tracking-wide">
                {x?.name|| "Untitled Product"}
              </h2>
             
            </div>
            <button
            onClick={()=> handleDelete(x?._id)}
              type="button"
              className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Delete Product
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProduct;
