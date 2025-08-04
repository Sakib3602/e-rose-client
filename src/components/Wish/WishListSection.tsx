"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

interface WishlistItem {
  id: string
  name: string
  price: string
  Hprice?: string // Optional original price
  image: string
}

export default function WishlistSection() {
  // Dummy data for demonstration. In a real app, this would come from state/API.
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Paro Lota",
      price: "$3049",
      Hprice: "$9000",
      image:
        "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/494471153_122175606308286011_5038306177013736916_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ZTakPB1H3HcQ7kNvwF4cXvD&_nc_oc=AdkOg5iZx7-Pju-RofKIoDpRlSKRPDLaFEfeCdVtPCsY9pEoecAz_y8GWVDL5nArAMY&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=rUHPxikjvyxB_ieCl-uliA&oh=00_AfQiAk7lz5zYe1UTFeq4oxQhPQIGLNvPe_mY5K8jli_yyg&oe=688A4AC2",
    },
    {
      id: "2",
      name: "Charo Lota",
      price: "$8900",
      image:
        "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/494664135_122175605918286011_2274073350216833900_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=SbfB28xsjisQ7kNvwHet36k&_nc_oc=AdmO227ssVD_AwI5vXQ3Q8O6l-p2HOFgdsFvl0CZivQoth9WbShuGu3LbNoaPV7SLC8&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=4gzOtqFBGmJ7hq6JsJnh2g&oh=00_AfTh4T3UV-L7tD6zUbQwGQQSPYTYyg9PrVDJoI9aajpe0Q&oe=688A7280",
    },
    {
      id: "3",
      name: "karo Lota",
      price: "$9090",
      Hprice: "$10000",
      image:
        "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/493120115_122175606206286011_6942613215684552849_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9-voW5lFOFkQ7kNvwFjFWlQ&_nc_oc=Admp7mwotrUQfTBsj-zzrQZgswVN3KDFzDUF5hVzWGe6oqzDo_JiqlHolasfp17ZhQU&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=0bojKXpDTrAgEPBSIyoHsw&oh=00_AfSfoWNe3vexwyiHBzma2gVHjKJtaLdcvwzspNpoQ9Y_Xw&oe=688A6AA9",
    },
  ])

  const handleRemoveItem = (id: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: "#761A24" }}>
          Your Wishlist
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4">Items you've saved for later</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg">Your wishlist is empty.</p>
          <p className="text-sm">Start adding your favorite products!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
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
                      onClick={() => handleRemoveItem(item.id)}
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
                    <span className="text-sm text-gray-500 line-through">{item.Hprice}</span>
                  )}
                  <span className="text-lg sm:text-xl font-bold" style={{ color: "#761A24" }}>
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
