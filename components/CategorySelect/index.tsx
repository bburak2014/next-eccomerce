"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CategorySelectProps {
	initialCategory: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ initialCategory }) => {
	const [category, setCategory] = useState(initialCategory);
	const router = useRouter();

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCategory = e.target.value;
		setCategory(newCategory);
		if (newCategory === "") { router.push(`/products`) }
		else router.push(`/products?category=${newCategory}`);
	};

	useEffect(() => {
		if (!initialCategory) {
			setCategory("");
		}
	}, [initialCategory]);
	
	return (
		<select value={category} onChange={handleCategoryChange} className="p-2 border rounded w-full mb-4">
			<option value="">Kategori Seç</option>
			<option value="smartphones">Akıllı Telefonlar</option>
			<option value="laptops">Dizüstü Bilgisayarlar</option>
			<option value="fragrances">Parfümler</option>
			{/* Diğer kategoriler */}
		</select>
	);
};

export default CategorySelect;