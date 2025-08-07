"use client";

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function FilterBar({ asc, setAsc, search, setSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearch(searchQuery);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "asc") {
      setAsc(true);
    } else if (value === "desc") {
      setAsc(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-between">
        {/* Search Input + Submit Button */}
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <Search className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={asc ? "asc" : "desc"}
            onChange={handleSortChange}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="desc">Sort by: Featured</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
