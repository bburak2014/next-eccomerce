"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface SearchInputProps {
  initialSearchQuery: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${searchQuery}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        placeholder="Ürün ara..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <button type="submit" className="hidden">Ara</button>
    </form>
  );
};

export default SearchInput;