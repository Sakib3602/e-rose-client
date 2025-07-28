"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Search, MessageCircle, Phone, Mail } from "lucide-react"
import { useState } from "react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  popular?: boolean
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the 'My Orders' section. You'll receive a tracking number via email once your order ships. You can also use this tracking number on our shipping partner's website for real-time updates.",
    category: "Orders",
    popular: true,
  },
  {
    id: "2",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all items in their original condition. Items must be unused, in original packaging, and accompanied by the receipt. Return shipping is free for defective items, while customer-initiated returns may incur a small shipping fee.",
    category: "Returns",
    popular: true,
  },
  {
    id: "3",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination. All international orders are subject to customs duties and taxes, which are the responsibility of the customer.",
    category: "Shipping",
    popular: true,
  },
  {
    id: "4",
    question: "How can I change or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 1 hour of placement. After this window, orders enter our fulfillment process and cannot be changed. Please contact our customer service team immediately if you need to make changes.",
    category: "Orders",
  },
  {
    id: "5",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through encrypted connections.",
    category: "Payment",
  },
  {
    id: "6",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping typically takes 7-14 business days depending on the destination country and customs processing.",
    category: "Shipping",
  },
  {
    id: "7",
    question: "Do you offer warranties on your products?",
    answer:
      "Yes, all our products come with a manufacturer's warranty. Electronics typically have a 1-2 year warranty, while other items may vary. Extended warranty options are available at checkout for select products.",
    category: "Products",
  },
  {
    id: "8",
    question: "How do I create an account?",
    answer:
      "Click the 'Sign Up' button in the top right corner of our website. You'll need to provide your email address, create a password, and verify your email. Creating an account allows you to track orders, save favorites, and checkout faster.",
    category: "Account",
  },
  {
    id: "9",
    question: "Can I get a refund instead of store credit?",
    answer:
      "Yes, refunds are processed back to your original payment method within 5-7 business days after we receive your returned item. Store credit is also available as an option and can be used immediately.",
    category: "Returns",
  },
  {
    id: "10",
    question: "Do you have a customer loyalty program?",
    answer:
      "Yes! Our VIP program offers exclusive discounts, early access to sales, free shipping on all orders, and birthday rewards. You automatically earn points with every purchase that can be redeemed for discounts.",
    category: "Account",
  },
]

const categories = [
  "Popular",
  "All",
  "Orders",
  "Shipping",
  "Returns",
  "Payment",
  "Products",
  "Account",
]

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Popular")

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesCategory = false
    if (selectedCategory === "Popular") {
      matchesCategory = faq.popular === true
    } else if (selectedCategory === "All") {
      matchesCategory = true
    } else {
      matchesCategory = faq.category === selectedCategory
    }

    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 pop600"
          style={{ color: "#761A24" }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-base sm:text-lg lg:text-xl pop400 max-w-2xl mx-auto">
          Find answers to common questions about our products, shipping,
          returns, and more.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 sm:mb-8 ">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor:
                  selectedCategory === category ? "#761A24" : undefined,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-md mx-auto mb-6 sm:mb-8">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <button
          onClick={() => setSearchTerm(searchTerm)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* All Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl" style={{ color: "#761A24" }}>
            {selectedCategory === "Popular"
              ? "Popular Questions"
              : selectedCategory === "All"
              ? "All Questions"
              : `${selectedCategory} Questions`}
          </CardTitle>
          <CardDescription>
            {filteredFAQs.length} question
            {filteredFAQs.length !== 1 ? "s" : ""} found
            {selectedCategory === "Popular" &&
              " - Most frequently asked by customers"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left text-sm sm:text-base hover:no-underline">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span className="flex-1">{faq.question}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                        {faq.popular && (
                          <Badge
                            variant="secondary"
                            className="text-xs"
                            style={{
                              backgroundColor: "#761A24",
                              color: "white",
                            }}
                          >
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                No questions found
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card className="mt-8 sm:mt-12">
        <CardHeader className="text-center">
          <CardTitle className="text-lg sm:text-xl" style={{ color: "#761A24" }}>
            Still have questions?
          </CardTitle>
          <CardDescription>
            Our customer support team is here to help
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <MessageCircle
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#761A24" }}
              />
              <h4 className="font-semibold mb-1 text-sm sm:text-base">Live Chat</h4>
              <p className="text-xs sm:text-sm text-gray-600">Available 24/7</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Phone
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#761A24" }}
              />
              <h4 className="font-semibold mb-1 text-sm sm:text-base">Phone Support</h4>
              <p className="text-xs sm:text-sm text-gray-600">Mon-Fri 9AM-6PM</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <Mail
                className="w-8 h-8 mx-auto mb-3"
                style={{ color: "#761A24" }}
              />
              <h4 className="font-semibold mb-1 text-sm sm:text-base">Email Support</h4>
              <p className="text-xs sm:text-sm text-gray-600">
                Response within 24h
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
