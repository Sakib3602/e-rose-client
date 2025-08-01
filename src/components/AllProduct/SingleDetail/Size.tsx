"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import ss from "../../../assets/gg.jpeg"
const Size: React.FC = () => {
  const [showFullText, setShowFullText] = useState(false)

  const toggleTextVisibility = () => {
    setShowFullText(!showFullText)
  }

  return (
    <section
    style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px, 40px 40px",
        }}
    
    className="bg-white text-gray-800 py-16 sm:py-24">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:gap-x-12">
        {/* Image Section (Left Column) */}
        <div className="flex-1 flex flex-col items-center lg:items-end mb-8 lg:mb-0">
          {/* Text at the top of the image section */}
          <div className="text-center font-bold text-xl sm:text-2xl md:text-3xl mb-4 text-gray-900">
            মাপের তালিকা {/* Bengali for "Size Chart" */}
          </div>
          {/* Image itself */}
          <img
            src={ss}
            alt="Size chart illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain cursor-pointer rounded-lg shadow-lg"
            onClick={toggleTextVisibility} // Image remains clickable to toggle text
          />
        </div>

        {/* Text Section (Right Column) */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6 text-gray-900">আমাদের শর্ত ও নিয়মাবলী</h2>
          <p className="mt-4 mb-6 text-base sm:text-lg text-gray-700 leading-relaxed">
            আপনাকে স্বাগতম। আপনার নির্বিঘ্ন অনলাইন শপিং এ সর্বোচ্চ সেবা প্রদানে আমরা বদ্ধ পরিকর। অর্ডার কনফার্ম করার পূর্বে নিম্নোক্ত বিষয়গুলো
            লক্ষ্য করুন:
          </p>
          {/* Conditionally render full text or truncated version */}
          {showFullText ? (
            <>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">শর্ত ও নিয়মাবলী:</h3>
              <ul className="list-decimal list-inside text-sm sm:text-base text-gray-600 space-y-3 text-left">
                <li>
                  আমাদের পোশাকগুলো সম্পুর্ন রূপে দেশীয় কারিগরদের হাতে তৈরি, তাই পোশাকের ক্ষেত্রে রং এ হালকা তারতম্য হতে পারে। এছাড়াও আলোর
                  তারতম্য এবং মোবাইল পিসির স্ক্রিনের কালার ভিন্নতার জন্য ছবির সাথে সামনা সামনি ড্রেসের রং এ সামান্য ভিন্ন হতে পারে।
                </li>
                <li>
                  কোনো কারণে ড্রেস সামনা সামনি পছন্দ না হলে বা ড্রেসে সমস্যা থাকলে আপনি ৩০ দিনের মধ্যে আমাদের যেকোনো আউটলেট থেকে
                  এক্সচেঞ্জ করে সেম ড্রেস বা সম মূল্যের অন্য যেকোনো ড্রেস নিতে পারবেন। আমাদের কোন ক্যাশব্যাক অপশন নেই। ৩০ দিন অতিবাহিত
                  হয়ে যাবার পর আমরা কোনো ধরনের ক্লেইম গ্রহণ করবো না। এক্সচেঞ্জের জন্য ড্রেসটি অবশ্যই ইনটেক এবং ফ্রেশ অবস্থায় থাকতে হবে।
                </li>
                <li>
                  আমরা আমাদের এক্সচেঞ্জ সুবিধাটি শুধুমাত্র আউটলেট থেকে প্রদান করি। তবে কেউ কুরিয়ারের মাধ্যমে এক্সচেঞ্জ চাইলে আমরা ব্যবস্থা করে
                  দিতে পারবো তবে সেক্ষেত্রে ডেলিভারি চার্জ ক্লায়েন্টকে বহন করতে হবে।
                </li>
                <li>
                  মডারেটর বিল করে দেয়ার পর অবশ্যই ভালোভাবে চেক করে নিন সব সঠিক আছে কি না। কোন সমস্যা থাকলে তা সরাসরি মডারেটরকে জানান।
                  আমাদের সার্ভিস বা মডারেটরগনের ব্যাপারে কোনো অভিযোগ থাকলে সরাসরি{" "}
                  <a href="mailto:support@shordindu.com.bd" className="text-blue-600 hover:underline">
                    support@shordindu.com.bd
                  </a>{" "}
                  এই এড্রেসে ইমেইল করুন উপযুক্ত প্রমাণসহ। আমরা সমস্যাগুলো সমাধানে সর্বোচ্চ প্রচেষ্টা চালাবো।
                </li>
                <li>
                  ডেলিভারি ম্যান থাকা অবস্থায় কাইন্ডলি পণ্যটি ভালোভাবে দেখে বুঝে নিন এবং বিল চেক করে পণ্যটি রিসিভ করুন। ড্রেস অথবা বিলে
                  কোনো সমস্যা থাকলে ডেলিভারি ম্যান থাকা অবস্থায় আমাদের সাথে যোগাযোগ করবেন, আমরা দ্রুত সমাধান করে দেবার চেষ্টা করবো। আমাদের
                  কাস্টমার কেয়ার নাম্বার{" "}
                  <a href="tel:09612100400" className="text-blue-600 hover:underline">
                    09612 100 400
                  </a>{" "}
                  বা ইনবক্সে কিংবা{" "}
                  <a href="mailto:support@shordindu.com.bd" className="text-blue-600 hover:underline">
                    support@shordindu.com.bd
                  </a>{" "}
                  এই এড্রেসে ইমেইলের মাধ্যমে জানান। ডেলিভারি ম্যান বেশি টাকা দাবি করলে বা বাজে ব্যবহার করলে তা আমাদের টিমকে কাইন্ডলি সরাসরি
                  জানান। আমরা অবশ্যই বিষয়টি ডেলিভারি এজেন্সির দৃষ্টিগোচর করবো এবং প্রয়োজনীয় ব্যবস্থা নেব। ড্রেস পছন্দ না হয়ে থাকলে
                  ডেলিভারি চার্জ টি পে করে পার্সেল ক্যান্সেল করতে পারবেন। ❤️
                </li>
                <li>
                  ওয়েবসাইটে ব্যবহার কৃত ছবি, পোশাকের নকশা বা লিখা শরদিন্দুর মেধা সম্পত্তি। অনুমতি ব্যাতীত পোশাকের নকশা, ছবি যে কোন ধরণের
                  ব্যবহার থেকে বিরত থাকুন। ©
                </li>
              </ul>
            </>
          ) : (
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              বিস্তারিত শর্ত ও নিয়মাবলী দেখতে "আরও জানুন" বাটনে ক্লিক করুন অথবা ছবিতে ক্লিক করুন।
            </p>
          )}

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8 justify-center lg:justify-start">
            <Button
              className="bg-[#761A24] hover:bg-[#5a141a] text-white px-8 py-3 text-base sm:text-lg font-semibold transition-colors"
              onClick={toggleTextVisibility}
            >
              {showFullText ? "কম দেখুন" : "আরও জানুন"}
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-800 hover:bg-gray-100 px-8 py-3 text-base sm:text-lg font-semibold transition-colors bg-transparent"
            >
              যোগাযোগ করুন
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Size
