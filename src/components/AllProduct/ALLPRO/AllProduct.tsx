import Nav from "@/components/Nav/Nav";
import FilterBar from "./FilterBar";
import SingleCard from "./SingleCard";
import Footer from "@/components/Footer/Footer";
import Only_Sm_Show from "@/components/Nav/Only_Sm_Show";
import { useQuery } from "@tanstack/react-query";
import useAxiosPub from "@/components/Axios/useAxiosPub";
import { Link } from "react-router-dom";
import { useState } from "react";
import Fuse from "fuse.js";

export default function AllProduct() {
  const axisPub = useAxiosPub();
  const [asc, setAsc] = useState(true);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["allBaby", asc, search],
    queryFn: async () => {
      const res = await axisPub.get(`/allData?sort=${asc ? "asc" : "desc"}`);
      return res.data;
    },
  });

  const options = {
  keys: ["name", "category", "price"],
  threshold: 0.3,
  includeScore: true,
};

// Create a safe `products` array from fetched `data`
const products =
  data?.map((item: any) => ({
    id: item._id,
    name: item.name,
    price: Number(item.price),
    image: item.pic1,
    hoverImage: item.pic2,
    isOnSale: true,
    discount: 25,
    Hprice: item?.Hprice,
    category: item?.category,
  })) || [];

const fuse = search && products.length > 0 ? new Fuse(products, options) : null;
const results = fuse ? fuse.search(search).map(res => res.item) : products;



  return (
    <div
      style={{
        backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)
          `,
        backgroundSize: "20px 20px, 40px 40px",
      }}
    >
      <Nav></Nav>
      <section className="py-8 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 pop600 text-[#761A24]">
            Women's Collection
          </h1>
          <p className="text-lg pop400 text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of trendy and elegant pieces for the
            modern woman
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          asc={asc}
          setAsc={setAsc}
          // search={search}
          setSearch={setSearch}
        ></FilterBar>

        {/* Results Info */}
        <div className="flex pop400 justify-between items-center mb-6">
          <p className="text-gray-600">Showing {products.length} products</p>
          <div className="text-sm text-gray-500">
            Free shipping on orders over $100
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-2xl shadow-sm transition-all duration-300 overflow-hidden border border-gray-100 animate-pulse"
                >
                  {/* Badge Placeholder */}
                  <div className="absolute top-3 left-3 z-10 h-5 w-16 bg-gray-300 rounded-full"></div>

                  {/* Image Placeholder */}
                  <div className="relative aspect-[3/4] bg-gray-200"></div>

                  {/* Wishlist Button Placeholder */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <div className="h-9 w-9 rounded-full bg-gray-300"></div>
                  </div>

                  {/* Product Info Placeholder */}
                  <div className="p-4 text-center space-y-2">
                    <div className="h-4 w-3/4 mx-auto bg-gray-300 rounded"></div>
                    <div className="flex justify-center items-center gap-2">
                      <div className="h-4 w-12 bg-gray-300 rounded"></div>
                      <div className="h-4 w-4 bg-gray-300 rounded"></div>
                      <div className="h-4 w-12 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            : results.map((product: any) => (
                <Link key={product.id} to={`details/${product?.id}`}>
                  <SingleCard product={product} />
                </Link>
              ))}
        </div>
      </section>
      <Footer></Footer>
      <Only_Sm_Show></Only_Sm_Show>
    </div>
  );
}
