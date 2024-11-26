// serach input component
"use client";

import Image from "next/image";
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
		<form onSubmit={(e) => e.preventDefault()}>
			<div className="relative pl-11 pr-4 py-3  border rounded-lg ">
				<span className="absolute inset-y-0 left-4 flex items-center">
				<Image src="/icons/icon_search.svg" alt="Search" width={20} height={20} />
				</span>
				<input
					type="text"
					placeholder="Quick search"
					value={searchQuery}
					onChange={handleChange}
					className="border-none w-full text-tertiary text-sm font-base bg-background focus:outline-none"
				/>
			</div>

		</form>
	);
};

export default SearchInput;