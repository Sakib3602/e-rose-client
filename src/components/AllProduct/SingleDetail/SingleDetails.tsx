"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, BaggageClaim, ShoppingCart, Car, RotateCcw, Tag, X } from "lucide-react"
import Nav from "@/components/Nav/Nav"
import Footer from "@/components/Footer/Footer"
import Only_Sm_Show from "@/components/Nav/Only_Sm_Show"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"
import useAxiosPub from "@/components/Axios/useAxiosPub"
import { toast } from "react-toastify"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Swal from "sweetalert2"

// Define interfaces for props and form data
interface ProductDetailsForOrder {
  _id: string
  product: string
  dressSize: string
  make: string
  orna: string
  inner: string
  quantity: number
  basePrice: number
  dressSizePrice: number
  makePrice: number
  ornaPrice: number
  innerPrice: number
  addonTotal: number
  subtotal: number
  deliveryCharge: number
  totalPrice: number
  pic1: string
  promoDiscount?: number
  promoCode?: string
}

interface OrderSubmissionData {
  userNumber: string
  name: string
  email: string
  district: string
  division: string
  address: string
  productDescription: string
  order: ProductDetailsForOrder[]
  totalTaka: number
  promoCode?: string
  promoDiscount?: number
}

// Promo code interface
interface PromoCode {
  code: string
  discount: number
  type: "percentage" | "fixed"
  minAmount?: number
  maxDiscount?: number
  isActive: boolean
}

const divisions = ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Mymensingh"]
const districts = ["Dhaka", "Gazipur", "Narayanganj", "Chittagong", "Cox's Bazar", "Sylhet", "Khulna", "Rajshahi"]

interface ProductData {
  name: string
  _id: string
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

interface ApiResponse extends ProductData {
  Stitch?: number
  Sticth_Pent?: number
  Orna?: number
  Inner?: number
  Un_Sticth_Pent?: number
}

interface CartItem {
  _id: string
  product: string
  dressSize: string
  make: string
  orna: string
  inner: string
  quantity: number
  basePrice: number
  dressSizePrice: number
  makePrice: number
  ornaPrice: number
  innerPrice: number
  addonTotal: number
  subtotal: number
  deliveryCharge: number
  totalPrice: number
  pic1: string
  promoDiscount?: number
  promoCode?: string
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
  const [selectedDressSize, setSelectedDressSize] = useState("")
  const [selectedMake, setSelectedMake] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedOrna, setSelectedOrna] = useState("")
  const [selectedInner, setSelectedInner] = useState("")
  const [errors, setErrors] = useState({
    dressSize: false,
  })
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)
  const [orderFormData, setOrderFormData] = useState({
    userNumber: "",
    name: "",
    email: "",
    district: "",
    division: "",
    address: "",
    productDescription: "",
  })
  const [productDetailsForModal, setProductDetailsForModal] = useState<ProductDetailsForOrder | null>(null)

  // Promo code states
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null)
  const [promoLoading, setPromoLoading] = useState(false)

  // Sample promo codes - In real app, these would come from your backend
  const availablePromoCodes: PromoCode[] = [
    {
      code: "SAKIB",
      discount: 10,
      type: "percentage",
      minAmount: 500,
      maxDiscount: 200,
      isActive: true,
    },
    
  ]

  // Add SweetAlert2 styles on component mount with mobile fixes
  useEffect(() => {
    const styleId = "swal-custom-styles"
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style")
      style.id = styleId
      style.textContent = `
        /* SweetAlert2 z-index fixes - Higher values for mobile */
        .swal-container-high-z {
          z-index: 999999 !important;
        }
        
        .swal2-container {
          z-index: 999999 !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }
        
        .swal2-backdrop-show {
          z-index: 999998 !important;
        }
        
        .swal2-popup {
          z-index: 999999 !important;
          font-family: inherit;
          position: relative !important;
          margin: auto !important;
          max-width: 90vw !important;
          max-height: 90vh !important;
          overflow-y: auto !important;
        }
        
        /* Ensure Swal appears above Sheet components */
        .swal2-container.swal2-backdrop-show {
          z-index: 999999 !important;
        }
        
        /* Mobile specific fixes */
        @media (max-width: 640px) {
          .swal2-popup {
            width: 95vw !important;
            max-width: 95vw !important;
            margin: 10px auto !important;
            font-size: 14px !important;
          }
          
          .swal2-title {
            font-size: 1.25rem !important;
            margin-bottom: 1rem !important;
          }
          
          .swal2-content {
            font-size: 0.9rem !important;
            margin-bottom: 1rem !important;
          }
          
          .swal2-actions {
            margin-top: 1rem !important;
            flex-direction: column !important;
            gap: 0.5rem !important;
          }
          
          .swal2-confirm,
          .swal2-cancel {
            width: 100% !important;
            margin: 0 !important;
            padding: 12px 20px !important;
            font-size: 16px !important;
            min-height: 44px !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
          }
        }
        
        /* Custom styling for better appearance */
        .swal2-title {
          font-size: 1.5rem;
          font-weight: 600;
        }
        
        .swal2-content {
          font-size: 1rem;
        }
        
        .swal2-confirm {
          background-color: #761a24 !important;
          border-color: #761a24 !important;
          border: none !important;
          border-radius: 6px !important;
          cursor: pointer !important;
          touch-action: manipulation !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        .swal2-confirm:hover,
        .swal2-confirm:focus,
        .swal2-confirm:active {
          background-color: #5a1319 !important;
          border-color: #5a1319 !important;
          outline: none !important;
        }
        
        .swal2-cancel {
          background-color: #6b7280 !important;
          border-color: #6b7280 !important;
          border: none !important;
          border-radius: 6px !important;
          cursor: pointer !important;
          touch-action: manipulation !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        .swal2-cancel:hover,
        .swal2-cancel:focus,
        .swal2-cancel:active {
          background-color: #4b5563 !important;
          border-color: #4b5563 !important;
          outline: none !important;
        }
        
        /* Prevent body scroll when SweetAlert is open */
        .swal2-shown {
          overflow: hidden !important;
        }
        
        /* Fix for iOS Safari */
        .swal2-container {
          -webkit-overflow-scrolling: touch !important;
        }
        
        /* Ensure buttons are clickable */
        .swal2-actions button {
          pointer-events: auto !important;
          position: relative !important;
          z-index: 1000000 !important;
        }
      `
      document.head.appendChild(style)
    }

    // Cleanup function to remove styles when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  // Reset order form data when modal opens/productDetailsForModal change
  useEffect(() => {
    if (isOrderFormOpen) {
      setOrderFormData({
        userNumber: "",
        name: "",
        email: "",
        district: "",
        division: "",
        address: "",
        productDescription: productDetailsForModal?.product || "",
      })
    }
  }, [isOrderFormOpen, productDetailsForModal])

  const handleOrderFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setOrderFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleOrderFormSelectChange = (id: string, value: string) => {
    setOrderFormData((prev) => ({ ...prev, [id]: value }))
  }

  const axiospub = useAxiosPub()
  const mutation = useMutation<unknown, Error, OrderSubmissionData>({
    mutationFn: async (data) => {
      const res = await axiospub.post("/order", data)
      return res.data
    },
  })

  // Promo code functions
  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code")
      return
    }

    setPromoLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const foundPromo = availablePromoCodes.find(
        (promo) => promo.code.toLowerCase() === promoCode.toLowerCase() && promo.isActive,
      )

      if (!foundPromo) {
        toast.error("Invalid promo code")
        setPromoLoading(false)
        return
      }

      const currentSubtotal = subtotal
      if (foundPromo.minAmount && currentSubtotal < foundPromo.minAmount) {
        toast.error(`Minimum order amount of ৳${foundPromo.minAmount} required for this promo code`)
        setPromoLoading(false)
        return
      }

      setAppliedPromo(foundPromo)
      toast.success(`Promo code "${foundPromo.code}" applied successfully!`)
      setPromoLoading(false)
    }, 1000)
  }

  const handleRemovePromoCode = () => {
    setAppliedPromo(null)
    setPromoCode("")
    toast.info("Promo code removed")
  }

  const calculatePromoDiscount = (subtotalAmount: number): number => {
    if (!appliedPromo) return 0

    let discount = 0
    if (appliedPromo.type === "percentage") {
      discount = (subtotalAmount * appliedPromo.discount) / 100
      if (appliedPromo.maxDiscount && discount > appliedPromo.maxDiscount) {
        discount = appliedPromo.maxDiscount
      }
    } else {
      discount = appliedPromo.discount
    }

    return Math.min(discount, subtotalAmount) // Discount can't be more than subtotal
  }

const handleOrderFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!productDetailsForModal) {
    await Swal.fire({
      title: "Error",
      text: "No product details available for order.",
      icon: "error",
      confirmButtonColor: "#761A24",
      customClass: {
        container: "swal-container-high-z",
      },
      heightAuto: false,
      scrollbarPadding: false,
    })
    return
  }

  const fullOrderData: OrderSubmissionData = {
    ...orderFormData,
    order: [productDetailsForModal],
    totalTaka: productDetailsForModal.totalPrice,
    promoCode: appliedPromo?.code,
    promoDiscount: calculatePromoDiscount(productDetailsForModal.subtotal),
  }

  try {
    const result = await Swal.fire({
      title: "Confirm Order?",
      text: "Please review your details before confirming.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#761A24",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Place Order!",
      cancelButtonText: "Cancel",
      customClass: {
        container: "swal-container-high-z",
      },
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      heightAuto: false,
      scrollbarPadding: false,
    })

    if (result.isConfirmed) {
      try {
        await mutation.mutateAsync(fullOrderData)

        await Swal.fire({
          title: "Order Placed!",
          text: "Your order has been successfully placed. We will contact you soon.",
          icon: "success",
          confirmButtonColor: "#761A24",
          customClass: {
            container: "swal-container-high-z",
          },
          heightAuto: false,
          scrollbarPadding: false,
        })

        // Reset states
        setIsOrderFormOpen(false)
        setAppliedPromo(null)
        setPromoCode("")
      } catch (err: any) {
        await Swal.fire({
          title: "Error",
          text: `Failed to place order: ${err?.message || "Unknown error"}`,
          icon: "error",
          confirmButtonColor: "#761A24",
          customClass: {
            container: "swal-container-high-z",
          },
          heightAuto: false,
          scrollbarPadding: false,
        })
      }
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    await Swal.fire({
      title: "Error",
      text: "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonColor: "#761A24",
      customClass: {
        container: "swal-container-high-z",
      },
      heightAuto: false,
      scrollbarPadding: false,
    })
  }
}


  const params = useParams()
  const [product, setProduct] = useState<ProductData | null>(null)
  const axisPub = useAxiosPub()

  const { data, isLoading, error } = useQuery<ApiResponse>({
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

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="max-w-7xl mx-auto p-4 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="w-full aspect-square bg-gray-300 rounded-md" />
              <div className="flex space-x-2 overflow-x-auto">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-md" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="w-1/3 h-4 bg-gray-300 rounded" />
                <div className="w-3/4 h-6 bg-gray-300 rounded" />
                <div className="w-1/4 h-4 bg-gray-300 rounded" />
              </div>
              <div className="space-y-2 mt-4">
                <div className="w-2/3 h-4 bg-gray-300 rounded" />
                <div className="w-full h-20 bg-gray-300 rounded" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="w-1/3 h-3 bg-gray-300 rounded" />
                    <div className="w-2/3 h-4 bg-gray-300 rounded" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-1/3 h-3 bg-gray-300 rounded" />
                    <div className="w-full h-10 bg-gray-300 rounded" />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="w-1/4 h-4 bg-gray-300 rounded mb-2" />
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-md" />
                  <div className="w-10 h-10 bg-gray-300 rounded-md" />
                  <div className="w-10 h-10 bg-gray-300 rounded-md" />
                </div>
              </div>
              <div className="mt-6">
                <div className="w-1/2 h-12 bg-gray-300 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Only_Sm_Show />
      </>
    )
  }

  // Show error state or if product data is not available
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

  // Dropdown options
  const dressSizes = ["UnStitched", ...Array.from({ length: (48 - 30) / 2 + 1 }, (_, i) => (30 + i * 2).toString())]

  const extractPrice = (selection: string): number => {
    const match = selection.match(/৳(\d+)/)
    return match ? Number.parseInt(match[1]) : 0
  }

  const makeOptions = [
    ...(data?.Un_Sticth_Pent && Number(data.Un_Sticth_Pent) > 0
      ? [`Non-Stitched-Pent ৳${Number(data.Un_Sticth_Pent)}`]
      : ["Non-Stitched-Pent"]),
    ...(data?.Sticth_Pent && Number(data.Sticth_Pent) > 0
      ? Array.from({ length: 11 }, (_, i) => {
          const size = 30 + i
          return `${data?.name} pajama-${size} ৳${Number(data.Sticth_Pent)}`
        })
      : []),
  ]

  const ornaOptions = [...(data?.Orna && Number(data.Orna) > 0 ? [`Orna ৳${Number(data.Orna)}`] : [])]
  const innerOptions = [...(data?.Inner && Number(data.Inner) > 0 ? [`Inner ৳${Number(data.Inner)}`] : [])]

  // Calculate addon prices
  const getDressSizePrice = (): number => {
    if (!selectedDressSize || selectedDressSize === "UnStitched") {
      return 0
    }
    return Number(data?.Stitch || 0)
  }

  const getMakePrice = (): number => {
    if (!selectedMake) {
      return 0
    }
    return Number(extractPrice(selectedMake))
  }

  const getOrnaPrice = (): number => {
    if (!selectedOrna) return 0
    if (selectedOrna.includes("Orna")) {
      return Number(extractPrice(selectedOrna))
    }
    return 0
  }

  const getInnerPrice = (): number => {
    if (!selectedInner) return 0
    if (selectedInner.includes("Inner")) {
      return Number(extractPrice(selectedInner))
    }
    return 0
  }

  // Calculate totals
  const addonTotal = getDressSizePrice() + getMakePrice() + getOrnaPrice() + getInnerPrice()
  const deliveryCharge = 0
  const subtotal = product.price * quantity + addonTotal
  const promoDiscount = calculatePromoDiscount(subtotal)
  const grandTotal = subtotal + deliveryCharge - promoDiscount

  const validateForm = () => {
    const newErrors = {
      dressSize: (Number(data?.Stitch) || 0) > 0 && !selectedDressSize,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleAddToCart = () => {
    if (validateForm()) {
      const formData: CartItem = {
        _id: product?._id,
        product: product.name,
        dressSize: selectedDressSize,
        make: selectedMake,
        orna: selectedOrna,
        inner: selectedInner,
        quantity: quantity,
        basePrice: product.price * quantity,
        dressSizePrice: getDressSizePrice(),
        makePrice: getMakePrice(),
        ornaPrice: getOrnaPrice(),
        innerPrice: getInnerPrice(),
        addonTotal: addonTotal,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        totalPrice: grandTotal,
        pic1: product?.pic1,
        promoDiscount: promoDiscount,
        promoCode: appliedPromo?.code,
      }

      const cartData = localStorage.getItem("cart")
      let CartIf: CartItem[] = []
      try {
        const parsed = JSON.parse(cartData || "[]")
        CartIf = Array.isArray(parsed) ? parsed : []
      } catch {
        CartIf = []
      }

      const exists = CartIf.find((item) => item._id === formData._id)
      if (exists) {
        CartIf = CartIf.filter((item) => item._id !== formData._id)
      }

      CartIf.push(formData)
      localStorage.setItem("cart", JSON.stringify(CartIf))
      toast.success("Item Added To The Cart.")
    } else {
      console.log("Form validation failed - please fill all required fields")
    }
  }

  const handleOrderNow = () => {
    if (validateForm()) {
      const orderDetails: ProductDetailsForOrder = {
        _id: product?._id,
        product: product.name,
        dressSize: selectedDressSize,
        make: selectedMake,
        orna: selectedOrna,
        inner: selectedInner,
        quantity: quantity,
        basePrice: product.price * quantity,
        dressSizePrice: getDressSizePrice(),
        makePrice: getMakePrice(),
        ornaPrice: getOrnaPrice(),
        innerPrice: getInnerPrice(),
        addonTotal: addonTotal,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        totalPrice: grandTotal,
        pic1: product?.pic1,
        promoDiscount: promoDiscount,
        promoCode: appliedPromo?.code,
      }

      setProductDetailsForModal(orderDetails)
      setIsOrderFormOpen(true)
    } else {
      console.log("Form validation failed - please fill all required fields")
    }
  }

  const images = [product.pic1, product.pic2].filter(Boolean)

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

  const stockStatus = getStockStatus(product.stock)

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
        className="max-w-7xl mx-auto p-4 sm:p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <ImageMagnifier
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  />
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
                  <p className="text-sm sm:text-base text-gray-900">{product?.season}</p>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-medium text-gray-500">Stock:</span>
                  <p className="text-sm sm:text-base text-gray-900">{product.stock} units</p>
                </div>
              </div>
            </div>

            {/* Dropdown Selections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Number(data?.Stitch) || 0) > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="dress-size" className="text-sm sm:text-base">
                    Dress Size <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setSelectedDressSize(value)
                      setErrors((prev) => ({ ...prev, dressSize: false }))
                    }}
                  >
                    <SelectTrigger
                      id="dress-size"
                      className={`text-sm sm:text-base ${errors.dressSize ? "border-red-300" : ""}`}
                    >
                      <SelectValue placeholder="Select dress size" />
                    </SelectTrigger>
                    <SelectContent>
                      {dressSizes.map((size) => (
                        <SelectItem key={size} value={size} className="text-sm sm:text-base">
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.dressSize && <p className="text-red-500 text-xs sm:text-sm">Please select a dress size</p>}
                </div>
              )}

              {makeOptions.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="make-type" className="text-sm sm:text-base">
                    Addon 1
                  </Label>
                  <Select onValueChange={(value) => setSelectedMake(value)}>
                    <SelectTrigger id="make-type" className="text-sm sm:text-base">
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
                </div>
              )}

              {ornaOptions.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="orna-type" className="text-sm sm:text-base">
                    Addon 2
                  </Label>
                  <Select onValueChange={(value) => setSelectedOrna(value)}>
                    <SelectTrigger id="orna-type" className="text-sm sm:text-base">
                      <SelectValue placeholder="Select Orna" />
                    </SelectTrigger>
                    <SelectContent>
                      {ornaOptions.map((ornaItem) => (
                        <SelectItem key={ornaItem} value={ornaItem} className="text-sm sm:text-base">
                          {ornaItem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {innerOptions.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="inner-type" className="text-sm sm:text-base">
                    Addon 3
                  </Label>
                  <Select onValueChange={(value) => setSelectedInner(value)}>
                    <SelectTrigger id="inner-type" className="text-sm sm:text-base">
                      <SelectValue placeholder="Select inner" />
                    </SelectTrigger>
                    <SelectContent>
                      {innerOptions.map((innerItem) => (
                        <SelectItem key={innerItem} value={innerItem} className="text-sm sm:text-base">
                          {innerItem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Selected Options Display */}
            {(selectedDressSize || selectedMake || selectedOrna || selectedInner) && (
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Selected Options:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDressSize && (
                    <Badge variant="outline" className="bg-white text-xs sm:text-sm">
                      Dress Size: {selectedDressSize}
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
                  {selectedInner && (
                    <Badge variant="outline" className="bg-white text-xs sm:text-sm">
                      Addon 3: {selectedInner}
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

            {/* Promo Code Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
              <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Promo Code
              </h3>

              {!appliedPromo ? (
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1"
                    disabled={promoLoading}
                  />
                  <Button
                    onClick={handleApplyPromoCode}
                    disabled={promoLoading || !promoCode.trim()}
                    style={{ backgroundColor: "#761A24", color: "white" }}
                  >
                    {promoLoading ? "Applying..." : "Apply"}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">
                      {appliedPromo.code} -{" "}
                      {appliedPromo.type === "percentage"
                        ? `${appliedPromo.discount}% OFF`
                        : `৳${appliedPromo.discount} OFF`}
                    </span>
                  </div>
                  <button onClick={handleRemovePromoCode} className="text-red-500 hover:text-red-700 p-1">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

            
            </div>

            {/* Price Breakdown Section */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 sm:p-4 rounded-lg border">
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">Price Breakdown</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Base Price:</span>
                  <span className="text-sm sm:text-base font-medium">৳{product.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Quantity ({quantity}):</span>
                  <span className="text-sm sm:text-base font-medium">৳{product.price * quantity}</span>
                </div>

                {(getDressSizePrice() > 0 || getMakePrice() > 0 || getOrnaPrice() > 0 || getInnerPrice() > 0) && (
                  <>
                    <hr className="border-gray-300" />
                    <div className="text-sm sm:text-base font-medium text-gray-700 mb-2">Addon Charges:</div>
                    {getDressSizePrice() > 0 && (
                      <div className="flex justify-between items-center pl-4">
                        <span className="text-xs sm:text-sm text-gray-600">• Dress Size Charge:</span>
                        <span className="text-xs sm:text-sm font-medium">৳{getDressSizePrice()}</span>
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
                    {getInnerPrice() > 0 && (
                      <div className="flex justify-between items-center pl-4">
                        <span className="text-xs sm:text-sm text-gray-600">• Addon 3 Charge:</span>
                        <span className="text-xs sm:text-sm font-medium">৳{getInnerPrice()}</span>
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

                <hr className="border-gray-300" />
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Subtotal:</span>
                  <span className="text-sm sm:text-base font-medium">৳{subtotal}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm sm:text-base">Promo Discount ({appliedPromo?.code}):</span>
                    <span className="text-sm sm:text-base font-medium">-৳{promoDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600">Delivery Charge:</span>
                  <span className="text-sm sm:text-base font-medium">৳{deliveryCharge}</span>
                </div>

                <hr className="border-gray-300" />
                <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                  <span style={{ color: "#761A24" }}>Total Amount:</span>
                  <span style={{ color: "#761A24" }}>৳{grandTotal}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="text-center text-sm text-green-600 font-medium">
                    You saved ৳{promoDiscount} with promo code!
                  </div>
                )}
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
                  <span className="text-xs sm:text-sm text-gray-600">Free Home Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Only_Sm_Show />

      {/* Order Now Form Modal */}
      <Sheet open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
        <SheetContent side="right" className="w-[min(95vw,500px)] sm:w-[min(90vw,600px)] flex flex-col px-2">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-center pop600">Place Your Order</SheetTitle>
            <SheetDescription className="text-center">
              Fill out the form below to complete your order for:{" "}
              <span className="font-semibold text-gray-900">{productDetailsForModal?.product || "Selected Item"}</span>
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto py-4 px-2">
            <form onSubmit={handleOrderFormSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="productSummary">Product Summary</Label>
                <Textarea
                  id="productSummary"
                  value={`Product: ${productDetailsForModal?.product || "N/A"}\nSize: ${
                    productDetailsForModal?.dressSize || "N/A"
                  }\nAddons: ${productDetailsForModal?.make || ""}, ${productDetailsForModal?.orna || ""}, ${
                    productDetailsForModal?.inner || ""
                  }\nQuantity: ${productDetailsForModal?.quantity || 1}\n${
                    appliedPromo ? `Promo Code: ${appliedPromo.code}\nDiscount: -৳${promoDiscount}\n` : ""
                  }Total Price: ৳${productDetailsForModal?.totalPrice?.toFixed(2) || "0.00"}`}
                  rows={appliedPromo ? 7 : 5}
                  readOnly
                  className="bg-gray-50 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={orderFormData.name}
                  onChange={handleOrderFormInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userNumber">User Number</Label>
                <Input
                  id="userNumber"
                  type="text"
                  placeholder="Enter your user number"
                  value={orderFormData.userNumber}
                  onChange={handleOrderFormInputChange}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={orderFormData.email}
                  onChange={handleOrderFormInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="division">Division</Label>
                <Select
                  onValueChange={(value) => handleOrderFormSelectChange("division", value)}
                  value={orderFormData.division}
                >
                  <SelectTrigger id="division">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((div) => (
                      <SelectItem key={div} value={div}>
                        {div}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Select
                  onValueChange={(value) => handleOrderFormSelectChange("district", value)}
                  value={orderFormData.district}
                >
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((dist) => (
                      <SelectItem key={dist} value={dist}>
                        {dist}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your full address including street, house number, etc."
                  value={orderFormData.address}
                  onChange={handleOrderFormInputChange}
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="productDescription">Additional Product Notes</Label>
                <Textarea
                  id="productDescription"
                  placeholder="Any additional notes about the product (e.g., specific color shade, delivery instructions)."
                  
                  onChange={handleOrderFormInputChange}
                  rows={3}
                />
              </div>

              {/* Price Summary in Modal */}
              <div className="sm:col-span-2 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{productDetailsForModal?.subtotal?.toFixed(2) || "0.00"}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo?.code}):</span>
                      <span>-৳{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>৳{productDetailsForModal?.deliveryCharge?.toFixed(2) || "0.00"}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span style={{ color: "#761A24" }}>
                      ৳{productDetailsForModal?.totalPrice?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  className="w-full"
                  style={{ backgroundColor: "#761A24", color: "white" }}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default SingleDetails
