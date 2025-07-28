"use client";

import {
  ArrowRight,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Carousel images
  const carouselImages = [
    {
      src: "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/493504469_122178712226286011_8720817429851753926_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Ld0QFLqSa3oQ7kNvwHqFb_n&_nc_oc=AdmXytZQfiWSKhKwi6cr82ro26u7nnGsgjQvLDlUlzZrRHOW58JgXE_WWfOGVFn-zko&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=-rv6oEMW3GsLNNmAV1hL_A&oh=00_AfRTovq6zxhkyVpZWR-kwOLsBNNnVsyCpo4i_Pv7R5_d5A&oe=688A4966",
      alt: "Elegant woman in stylish fashion",
      price: "$29.99",
    },
    {
      src: "https://scontent.fdac134-1.fna.fbcdn.net/v/t39.30808-6/499714380_122180901380286011_337316531027721985_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=P6oM2IHmTLUQ7kNvwEQJQgT&_nc_oc=Adlv9lilFE1VB5EfD0fP0jEjPJGqsyezcx0lM5W9C_V6k0YTiR5Kt1EsoX8bt6AxPgE&_nc_zt=23&_nc_ht=scontent.fdac134-1.fna&_nc_gid=lYWYLK2KpVL_h0HLUU-SMA&oh=00_AfSwuk-XNczwemmqAtfCC6_1-RYx9Uweuq2mYCYfVCYNDw&oe=688A48EA",
      alt: "Summer fashion collection",
      price: "$39.99",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex(
      currentImageIndex === 0
        ? carouselImages.length - 1
        : currentImageIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      currentImageIndex === carouselImages.length - 1
        ? 0
        : currentImageIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px, 40px 40px",
        }}
      ></div>

      {/* Subtle paper grain */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23999999' fillOpacity='0.08'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3Ccircle cx='17' cy='37' r='1'/%3E%3Ccircle cx='37' cy='17' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh] lg:min-h-[70vh]">
            {/* Content Side */}
            <div className="pop400 order-2 lg:order-1 space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div
                  className="inline-flex items-center px-4 py-2 bg-red-50 text-red-900 rounded-full text-sm font-medium shadow-sm border border-red-100"
                  style={{
                    backgroundColor: "rgba(118, 26, 36, 0.1)",
                    color: "#761A24",
                    borderColor: "rgba(118, 26, 36, 0.2)",
                  }}
                >
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  New Collection 2025
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  <span
                    className="pop900 bg-gradient-to-r from-red-900 to-black bg-clip-text text-transparent"
                    style={{
                      background: `linear-gradient(135deg, #761A24, #000000)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Discover Your
                  </span>
                  <br />
                  <span className="text-black dark:text-white drop-shadow-sm pop900">
                    Perfect Style
                  </span>
                </h1>

                <p className="pop400 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0 drop-shadow-sm">
                  Elevate your wardrobe with our curated collection of trendy,
                  comfortable, and affordable fashion pieces designed for the
                  modern woman.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border-0"
                  style={{
                    background: "linear-gradient(135deg, #761A24, #5a1419)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #5a1419, #4a1115)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #761A24, #5a1419)";
                  }}
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-white/60 shadow-sm"
                  style={{
                    borderColor: "#761A24",
                    color: "#761A24",
                    borderWidth: "2px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(118, 26, 36, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.6)";
                  }}
                >
                  View Collection
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-300/60">
                <div className="text-center lg:text-left">
                  <div
                    className="text-2xl lg:text-3xl font-bold drop-shadow-sm"
                    style={{ color: "#761A24" }}
                  >
                    890+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-black drop-shadow-sm">
                    1000+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Products
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div
                    className="text-2xl lg:text-3xl font-bold drop-shadow-sm"
                    style={{ color: "#761A24" }}
                  >
                    4.9★
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Image Carousel Side */}
            <div className="order-1 lg:order-2 relative">
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl group"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Carousel Images */}
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                  {carouselImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  style={{ color: "#761A24" }}
                >
                  <ChevronLeft className="w-6 h-6" strokeWidth={2} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  style={{ color: "#761A24" }}
                >
                  <ChevronRight className="w-6 h-6" strokeWidth={2} />
                </button>

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Heart
                      className="w-5 h-5 fill-current"
                      style={{ color: "#761A24" }}
                    />
                    <span className="text-sm font-semibold text-gray-800">
                      Trending
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-sm font-semibold text-gray-800">
                    From {carouselImages[currentImageIndex].price}
                  </div>
                  <div className="text-xs text-gray-600">Free Shipping</div>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 right-6 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "bg-white shadow-lg scale-110"
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Background Decoration */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-xl"
                style={{
                  background: "linear-gradient(135deg, #761A24, #000000)",
                }}
              ></div>
              <div
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-20 blur-xl"
                style={{
                  background: "linear-gradient(135deg, #000000, #761A24)",
                }}
              ></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
