// serach input component
"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

interface SearchInputProps {
	initialSearchQuery: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialSearchQuery }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();
 
	const debounce = (func: (...args: unknown[]) => void, delay: number) => {
		let timer: ReturnType<typeof setTimeout>;
		return (...args: Parameters<typeof func>) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func(...args);

			}, delay);

		};

	};

	const debouncedSearch = useCallback(
		debounce(() => {
			if (searchQuery?.length >= 3 && searchQuery.trim()) {
				router.push(`/products?search=${searchQuery}`);
			}
		}, 500),
		[searchQuery]
	);

	useEffect(() => {
 			debouncedSearch();
		 
	}, [searchQuery]);

	useEffect(() => {
		if (!initialSearchQuery) {
			setSearchQuery("");
		}
	}, [initialSearchQuery]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<form onSubmit={(e) => e.preventDefault()} className="mb-4">
			<input
				type="text"
				placeholder="Ürün aramak için 3 karakter girin"
				value={searchQuery}
				onChange={handleChange}
				className="p-2 border rounded w-full"
			/>
		</form>
	);
};

export default SearchInput;