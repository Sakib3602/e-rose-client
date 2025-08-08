"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Nav from "../Nav/Nav"
import Footer from "../Footer/Footer"
import Only_Sm_Show from "../Nav/Only_Sm_Show"
import { Link } from "react-router-dom"

interface WishlistItem {
  _id: string 
  id: string 
  name: string
  price: string
  Hprice?: string // Optional original price
  image: string
}

export default function WishlistSection() {
  const [wish, setWish] = useState<WishlistItem[]>([])

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishList")
    const currentWishlist: WishlistItem[] = storedWishlist ? JSON.parse(storedWishlist) : []
    setWish(currentWishlist)
  }, [])



  const handleRemoveItem = (_id: string) => {
    const updatedWishlist = wish.filter((item) => item._id !== _id)
    setWish(updatedWishlist)
    localStorage.setItem("wishList", JSON.stringify(updatedWishlist))
  }

  return (
    <>
      <Nav></Nav>
      <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl pop600 mb-2" style={{ color: "#761A24" }}>
            Your Wishlist
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4 pop400">Items you've saved for later</p>
        </div>

        {wish?.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">Your wishlist is empty.</p>
            <p className="text-sm">Start adding your favorite products!</p>
            <Link to={"/allproduct"}> <p className="text-sm underline">View Our All Products</p></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {wish?.map((item) => (
              <Link to={`/allproduct/details/${item?._id || item?.id}`}>
              <div
                key={item._id} // Use _id as key
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 group"
              >
                {/* Image container with overlay icons */}
                <div className="relative overflow-hidden aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay with icons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent group-hover:from-black/30 group-hover:via-black/5 transition-all duration-700">
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 shadow-lg"
                        onClick={() => handleRemoveItem(item._id)} // Use _id for removal
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <XCircle className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Product details */}
                <div className="p-3 text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2 mb-1">{item.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    {item.Hprice && item.Hprice !== item.price && (
                      <span className="text-sm pop400">৳ {item.Hprice}</span>
                    )}
                    <span> - </span>
                    <span className="text-sm pop400" style={{ color: "#761A24" }}>
                      ৳ {item.price}
                    </span>
                  </div>
                </div>
              </div>
              
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer></Footer>
      <Only_Sm_Show></Only_Sm_Show>
    </>
  )
}
