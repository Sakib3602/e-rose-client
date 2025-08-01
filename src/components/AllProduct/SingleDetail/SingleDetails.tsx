"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, BaggageClaim, ShoppingCart, Car, RotateCcw, Loader2 } from "lucide-react"
import Nav from "@/components/Nav/Nav"
import Footer from "@/components/Footer/Footer"
import Only_Sm_Show from "@/components/Nav/Only_Sm_Show"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import useAxiosPub from "@/components/Axios/useAxiosPub"

interface ProductData {
  name: string
  price: number
  description: string
  category: string
  brand: string
  stock: number
  sizes: string[]
  colors: string[]
  material: string
  gender: string
  season: string
  pic1: string
  pic2: string
  rating: number
  reviews: number
}

const ImageMagnifier: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <div
      className="relative overflow-hidden cursor-crosshair bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-300"
        style={{
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Magnified overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 bg-no-repeat pointer-events-none border-4 border-white shadow-2xl"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "400%",
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            zIndex: 10,
            borderRadius: "12px",
            imageRendering: "crisp-edges",
          }}
        />
      )}

      {/* Magnifier lens indicator */}
      {isHovered && (
        <div
          className="absolute w-24 h-24 border-4 border-white rounded-full pointer-events-none shadow-xl bg-white/20"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Zoom hint */}
      {!isHovered && (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/80 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
          🔍 Hover to zoom
        </div>
      )}
    </div>
  )
}

const SingleDetails: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedStitchType, setSelectedStitchType] = useState("")
  const [selectedMake, setSelectedMake] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedOrna, setSelectedOrna] = useState("")
  const [errors, setErrors] = useState({
    size: false,
    color: false,
    stitchType: false,
    make: false,
    orna: false,
  })

  const params = useParams()
  const [product, setProduct] = useState<ProductData | null>(null)
  const axisPub = useAxiosPub()

  const { data, isLoading, error } = useQuery({
    queryKey: ["allBabySingle", params?.id],
    queryFn: async () => {
      const res = await axisPub.get(`/allData/${params?.id}`)
      return res.data
    },
    enabled: !!params?.id,
  })

  useEffect(() => {
    if (data) {
      setProduct(data)
    }
  }, [data])

  console.log(data)

  // Dropdown options
  const stitchTypes = [`Stitched ৳${data?.price} + ৳${data?.Stitch}`, `Non-Stitched ৳${data?.price}`]
  const makeOptions = [`Stitch Pent ৳${data?.price} + ৳${data?.Sticth_Pent}`, `Non-Stitched-Pent ৳${data?.price}`]
  const orna = [`Orna ৳${data?.Orna}`]

  // Function to extract price from selection string
  const extractPrice = (selection: string): number => {
    const match = selection.match(/৳(\d+)/)
    return match ? Number.parseInt(match[1]) : 0
  }

  // Calculate addon prices
  const getStitchPrice = (): number => {
    if (!selectedStitchType) return 0
    if (selectedStitchType.includes("Stitched") && selectedStitchType.includes("+")) {
      return extractPrice(selectedStitchType.split("+")[1])
    }
    return 0
  }

  const getMakePrice = (): number => {
    if (!selectedMake) return 0
    if (selectedMake.includes("Stitch Pent") && selectedMake.includes("+")) {
      return extractPrice(selectedMake.split("+")[1])
    }
    return 0
  }

  const getOrnaPrice = (): number => {
    if (!selectedOrna) return 0
    return extractPrice(selectedOrna)
  }

  // Calculate totals
  let addonTotal = 0
  let subtotal = 0
  const deliveryCharge = 0
  let grandTotal = 0

  if (product) {
    addonTotal = getStitchPrice() + getMakePrice() + getOrnaPrice()
    subtotal = product.price * quantity + addonTotal
    grandTotal = subtotal + deliveryCharge
  }

  const validateForm = () => {
    const newErrors = {
      size: product?.sizes && product?.sizes.length > 0 && !selectedSize,
      color: product?.colors && product?.colors.length > 0 && !selectedColor,
      stitchType: data?.Stitch > 0 && !selectedStitchType,
      make: makeOptions.length > 0 && !selectedMake,
      orna: data?.Orna > 0 && !selectedOrna,
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleAddToCart = () => {
    if (validateForm()) {
      const formData = {
        product: product?.name,
        size: selectedSize,
        color: selectedColor,
        stitchType: selectedStitchType,
        make: selectedMake,
        orna: selectedOrna,
        quantity: quantity,
        basePrice: product?.price * quantity,
        stitchPrice: getStitchPrice(),
        makePrice: getMakePrice(),
        ornaPrice: getOrnaPrice(),
        addonTotal: addonTotal,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        totalPrice: grandTotal,
      }
      console.log("Add to Cart - Form Data:", formData)
      // Add to cart logic here
    } else {
      console.log("Form validation failed - please fill all required fields")
    }
  }

  const handleOrderNow = () => {
    if (validateForm()) {
      const formData = {
        product: product?.name,
        size: selectedSize,
        color: selectedColor,
        stitchType: selectedStitchType,
        make: selectedMake,
        orna: selectedOrna,
        quantity: quantity,
        basePrice: product?.price * quantity,
        stitchPrice: getStitchPrice(),
        makePrice: getMakePrice(),
        ornaPrice: getOrnaPrice(),
        addonTotal: addonTotal,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        totalPrice: grandTotal,
      }
      console.log("Order Now - Form Data:", formData)
      // Order now logic here
    } else {
      console.log("Form validation failed - please fill all required fields")
    }
  }

  const images = [product?.pic1, product?.pic2].filter(Boolean)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const getStockStatus = (stock: number) => {
    if (stock > 50) return { text: "In Stock", color: "bg-green-100 text-green-800" }
    if (stock > 10) return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800" }
    if (stock > 0) return { text: "Few Left", color: "bg-orange-100 text-orange-800" }
    return { text: "Out of Stock", color: "bg-red-100 text-red-800" }
  }

  const stockStatus = product ? getStockStatus(product.stock) : { text: "", color: "" }

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-sm sm:text-base">Loading product details...</span>
          </div>
        </div>
        <Footer />
        <Only_Sm_Show />
      </>
    )
  }

  // Show error state
  if (error || !product) {
    return (
      <>
        <Nav />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-sm sm:text-base text-gray-600">
              The product you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
        <Footer />
        <Only_Sm_Show />
      </>
    )
  }

  return (
    <>
      <Nav />
      <div
      style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px, 40px 40px",
        }}
       className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image with Magnifier */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <ImageMagnifier
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  />
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all z-30"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all z-30"
                      >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      currentImageIndex === index ? "border-primary" : "border-gray-200 hover:border-gray-300"
                    }`}
                    style={currentImageIndex === index ? { borderColor: "#761A24" } : {}}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Product Information */}
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  {product.category}
                </Badge>
                <Badge className={`${stockStatus.color} text-xs sm:text-sm`}>{stockStatus.text}</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-sm sm:text-base text-gray-600 mb-2">by {product.brand}</p>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-4" style={{ color: "#761A24" }}>
                ৳{product.price}
              </div>
            </div>
            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">Description</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
              {/* Product Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <span className="text-xs sm:text-sm font-medium text-gray-500">Material:</span>
                  <p className="text-sm sm:text-base text-gray-900">{product.material}</p>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-medium text-gray-500">Gender:</span>
                  <p className="text-sm sm:text-base text-gray-900">{product.gender}</p>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-medium text-gray-500">Season:</span>
                  <p className="text-sm sm:text-base text-gray-900">{product.season}</p>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-medium text-gray-500">Stock:</span>
                  <p className="text-sm sm:text-base text-gray-900">{product.stock} units</p>
                </div>
              </div>
            </div>
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3">
                  Size <span className="text-red-500">*</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size)
                        setErrors((prev) => ({ ...prev, size: false }))
                      }}
                      className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg transition-colors text-sm sm:text-base ${
                        selectedSize === size
                          ? "border-primary text-white"
                          : errors.size
                            ? "border-red-300 text-gray-700 hover:border-red-400"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                      style={selectedSize === size ? { backgroundColor: "#761A24" } : {}}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {errors.size && <p className="text-red-500 text-xs sm:text-sm mt-1">Please select a size</p>}
              </div>
            )}
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3">
                  Color <span className="text-red-500">*</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color)
                        setErrors((prev) => ({ ...prev, color: false }))
                      }}
                      className={`px-3 py-2 sm:px-4 sm:py-2 border rounded-lg transition-colors text-sm sm:text-base ${
                        selectedColor === color
                          ? "border-primary text-white"
                          : errors.color
                            ? "border-red-300 text-gray-700 hover:border-red-400"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                      style={selectedColor === color ? { backgroundColor: "#761A24" } : {}}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                {errors.color && <p className="text-red-500 text-xs sm:text-sm mt-1">Please select a color</p>}
              </div>
            )}
            {/* New Dropdown Selections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stitch Type Dropdown */}
              {data?.Stitch > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="stitch-type" className="text-sm sm:text-base">
                    Stitch Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setSelectedStitchType(value)
                      setErrors((prev) => ({ ...prev, stitchType: false }))
                    }}
                  >
                    <SelectTrigger
                      id="stitch-type"
                      className={`text-sm sm:text-base ${errors.stitchType ? "border-red-300" : ""}`}
                    >
                      <SelectValue placeholder="Select stitch type" />
                    </SelectTrigger>
                    <SelectContent>
                      {stitchTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-sm sm:text-base">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.stitchType && <p className="text-red-500 text-xs sm:text-sm">Please select a stitch type</p>}
                </div>
              )}
              {/* addon 1 */}
              {makeOptions.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="make-type" className="text-sm sm:text-base">
                    Addon 1 <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setSelectedMake(value)
                      setErrors((prev) => ({ ...prev, make: false }))
                    }}
                  >
                    <SelectTrigger
                      id="make-type"
                      className={`text-sm sm:text-base ${errors.make ? "border-red-300" : ""}`}
                    >
                      <SelectValue placeholder="Select addon" />
                    </SelectTrigger>
                    <SelectContent>
                      {makeOptions.map((make) => (
                        <SelectItem key={make} value={make} className="text-sm sm:text-base">
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.make && <p className="text-red-500 text-xs sm:text-sm">Please select an addon</p>}
                </div>
              )}
              {/* Orna Dropdown */}
              {data?.Orna > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="orna-type" className="text-sm sm:text-base">
                    Addon 2 <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setSelectedOrna(value)
                      setErrors((prev) => ({ ...prev, orna: false }))
                    }}
                  >
                    <SelectTrigger
                      id="orna-type"
                      className={`text-sm sm:text-base ${errors.orna ? "border-red-300" : ""}`}
                    >
                      <SelectValue placeholder="Select addon 2" />
                    </SelectTrigger>
                    <SelectContent>
                      {orna.map((ornaItem) => (
                        <SelectItem key={ornaItem} value={ornaItem} className="text-sm sm:text-base">
                          {ornaItem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.orna && <p className="text-red-500 text-xs sm:text-sm">Please select addon 2</p>}
                </div>
              )}
            </div>
            {/* Selected Options Display */}
            {(selectedStitchType || selectedMake || selectedOrna) && (
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Selected Options:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStitchType && (
                    <Badge variant="outline" className="bg-white text-xs sm:text-sm">
                      Stitch: {selectedStitchType}
                    </Badge>
                  )}
                  {selectedMake && (
                    <Badge variant="outline" className="bg-white text-xs sm:text-sm">
                      Addon 1: {selectedMake}
                    </Badge>
                  )}
                  {selectedOrna && (
                    <Badge variant="outline" className="bg-white text-xs sm:text-sm">
                      Addon 2: {selectedOrna}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            {/* Quantity */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-sm sm:text-base"
                >
                  -
                </button>
                <span className="text-base sm:text-lg font-medium w-8 sm:w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 text-sm sm:text-base"
                >
                  +
                </button>
              </div>
            </div>
            {/* Price Breakdown Section */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg border">
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">Price Breakdown</h3>
              <div className="space-y-2 sm:space-y-3">
                {/* Base Price */}
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Base Price:</span>
                  <span className="text-sm sm:text-base font-medium">৳{product.price}</span>
                </div>
                {/* Quantity Calculation */}
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Quantity ({quantity}):</span>
                  <span className="text-sm sm:text-base font-medium">৳{product.price * quantity}</span>
                </div>

                {/* Addon Prices */}
                {(getStitchPrice() > 0 || getMakePrice() > 0 || getOrnaPrice() > 0) && (
                  <>
                    <hr className="border-gray-300" />
                    <div className="text-sm sm:text-base font-medium text-gray-700 mb-2">Addon Charges:</div>

                    {getStitchPrice() > 0 && (
                      <div className="flex justify-between items-center pl-4">
                        <span className="text-xs sm:text-sm text-gray-600">• Stitch Charge:</span>
                        <span className="text-xs sm:text-sm font-medium">৳{getStitchPrice()}</span>
                      </div>
                    )}

                    {getMakePrice() > 0 && (
                      <div className="flex justify-between items-center pl-4">
                        <span className="text-xs sm:text-sm text-gray-600">• Addon 1 Charge:</span>
                        <span className="text-xs sm:text-sm font-medium">৳{getMakePrice()}</span>
                      </div>
                    )}

                    {getOrnaPrice() > 0 && (
                      <div className="flex justify-between items-center pl-4">
                        <span className="text-xs sm:text-sm text-gray-600">• Addon 2 Charge:</span>
                        <span className="text-xs sm:text-sm font-medium">৳{getOrnaPrice()}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center font-medium border-t border-gray-300 pt-2">
                      <span className="text-sm sm:text-base text-gray-700">Addon Total:</span>
                      <span className="text-sm sm:text-base" style={{ color: "#761A24" }}>
                        ৳{addonTotal}
                      </span>
                    </div>
                  </>
                )}

                {/* Delivery Charge */}
                <hr className="border-gray-300" />
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Delivery Charge:</span>
                  <span className="text-sm sm:text-base font-medium">৳{deliveryCharge}</span>
                </div>

                <hr className="border-gray-300" />
                {/* Total Calculation */}
                <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                  <span style={{ color: "#761A24" }}>Total Amount:</span>
                  <span style={{ color: "#761A24" }}>৳{grandTotal}</span>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full text-white py-2.5 sm:py-3 text-sm sm:text-base"
                style={{ backgroundColor: "#761A24" }}
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button
                variant="outline"
                className="w-full py-2.5 sm:py-3 bg-transparent text-sm sm:text-base"
                disabled={product.stock === 0}
                onClick={handleOrderNow}
              >
                <BaggageClaim className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Order Now"}
              </Button>
            </div>
            {/* Features */}
            <div className="border-t pt-4 sm:pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <span className="text-xs sm:text-sm text-gray-600">4-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <span className="text-xs sm:text-sm text-gray-600">Free Home Delevary</span>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Only_Sm_Show />
    </>
  )
}

export default SingleDetails
