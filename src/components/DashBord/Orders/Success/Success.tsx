import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full"
               style={{ backgroundColor: "#761A2433" }}>
            <span className="text-4xl" style={{ color: "#761A24" }}>✔</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#761A24" }}>
          Congratulations!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 mb-6">
          Your order has been successfully confirmed.
        </p>

        {/* Button */}
        <Link
          to={"/"}
          className="block w-full py-3 rounded-lg text-white font-semibold transition transform hover:scale-105"
          style={{ backgroundColor: "#761A24" }}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
