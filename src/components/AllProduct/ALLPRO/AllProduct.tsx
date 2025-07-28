
import Nav from "@/components/Nav/Nav"
import FilterBar from "./FilterBar"
import SingleCard from "./SingleCard"
import Footer from "@/components/Footer/Footer"
import Only_Sm_Show from "@/components/Nav/Only_Sm_Show"

const products = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 89.99,
    originalPrice: 120.0,
    image: "https://source.unsplash.com/400x600/?summer-dress,floral",
    hoverImage: "https://source.unsplash.com/400x600/?dress,fashion,summer",
    category: "Dresses",
    isOnSale: true,
    discount: 25,
  },
  {
    id: 2,
    name: "Elegant Evening Gown",
    price: 199.99,
    image: "https://source.unsplash.com/400x600/?evening-dress,elegant",
    hoverImage: "https://source.unsplash.com/400x600/?gown,formal-dress",
    category: "Dresses",
    isOnSale: false,
  },
  {
    id: 3,
    name: "Casual Denim Jacket",
    price: 79.99,
    image: "https://source.unsplash.com/400x600/?denim-jacket,fashion",
    hoverImage: "https://source.unsplash.com/400x600/?jacket,casual-wear",
    category: "Outerwear",
    isOnSale: false,
  },
  {
    id: 4,
    name: "Silk Blouse",
    price: 65.99,
    originalPrice: 85.0,
    image: "https://source.unsplash.com/400x600/?silk-blouse,fashion",
    hoverImage: "https://source.unsplash.com/400x600/?blouse,women-fashion",
    category: "Tops",
    isOnSale: true,
    discount: 22,
  },
  {
    id: 5,
    name: "High-Waisted Jeans",
    price: 95.99,
    image: "https://source.unsplash.com/400x600/?jeans,denim,fashion",
    hoverImage: "https://source.unsplash.com/400x600/?high-waist-jeans,women",
    category: "Bottoms",
    isOnSale: false,
  },
  {
    id: 6,
    name: "Knit Sweater",
    price: 55.99,
    image: "https://source.unsplash.com/400x600/?sweater,knitwear",
    hoverImage: "https://source.unsplash.com/400x600/?knit,cozy-fashion",
    category: "Tops",
    isOnSale: false,
  },
 
]

export default function AllProduct() {
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
        {products.map((product) => (
          <SingleCard key={product.id} product={product} />
        ))}
      </div>
    </section>
    <Footer></Footer>
    <Only_Sm_Show></Only_Sm_Show>
    </div>
  )
}
