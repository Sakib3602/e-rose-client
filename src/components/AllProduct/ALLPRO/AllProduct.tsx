
import Nav from "@/components/Nav/Nav"
import FilterBar from "./FilterBar"
import SingleCard from "./SingleCard"
import Footer from "@/components/Footer/Footer"
import Only_Sm_Show from "@/components/Nav/Only_Sm_Show"
import { useQuery } from "@tanstack/react-query"
import useAxiosPub from "@/components/Axios/useAxiosPub"
import { Link } from "react-router-dom"



export default function AllProduct() {
  const axisPub = useAxiosPub();
  const {data} = useQuery({
    queryKey : ["allBaby"],
    queryFn : async()=>{
      const res = await axisPub.get("/allData");
      return res.data;
    }
  })
  console.log(data,"all data")
   const products = data?.map((item: any) => ({
  id: item._id,
  name: item.name,
  price: Number(item.price),
  image: item.pic1,
  hoverImage: item.pic2,
  category: "Dresses",
  isOnSale: true,
  discount: 25,
})) || [];

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
    <section
    
    className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 pop600 text-[#761A24]">Women's Collection</h1>
        <p className="text-lg pop400 text-gray-600 max-w-2xl mx-auto">
          Discover our latest collection of trendy and elegant pieces for the modern woman
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar />

      {/* Results Info */}
      <div className="flex pop400 justify-between items-center mb-6">
        <p className="text-gray-600">Showing {products.length} products</p>
        <div className="text-sm text-gray-500">Free shipping on orders over $100</div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product : any) => (
          <Link to={`details/${product?.id}`}>
          
          <SingleCard key={product.id} product={product} />
          </Link>
        ))}
      </div>
    </section>
    <Footer></Footer>
    <Only_Sm_Show></Only_Sm_Show>
    </div>
  )
}
