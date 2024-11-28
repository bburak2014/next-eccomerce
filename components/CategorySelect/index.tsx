"use client";

import { replaceHyphensWithSpaces } from "@/utils/helper";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CategorySelectProps {
	initialCategory: string;
	categories: string[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({ initialCategory, categories }) => {
	const [category, setCategory] = useState(initialCategory);
	const router = useRouter();

	// Kategori değiştiğinde çağrılır
	const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newCategory = e.target.value;

		// Eğer aynı kategori seçiliyse, seçimi sıfırla
		if (category === newCategory) {
			setCategory("");  // Kategoriyi sıfırla
		} else {
			setCategory(newCategory);  // Yeni kategori seçildi
		}
	};
	const handleClick = () => {
		if (category) 
			{
				router.push(`/products?category=${category}`);  // Seçilen kategori ile yönlendir
			}
	  else {
			router.push(`/products`);  // Kategori seçili değilse ürün sayfasını göster
		}
	}
	useEffect(() => {
		if (!initialCategory) {
			setCategory("");
		}
	}, [initialCategory]);

	return (
		<>
			<h3 className="font-bold text-lg text-black mt-4 mb-4 leading-[27px] tracking-1">
				Kategoriler
				<div className="w-full h-[5px] bg-black mt-1"></div>
			</h3>

			<div className="flex items-start flex-col gap-4 max-h-[21vh] overflow-y-auto">
				{categories?.map((item) => (
					<div key={item} className="flex gap-[10px] items-center">
						{/* Checkbox kullanıyoruz */}
						<input
							type="checkbox"
							id={item}
							name="category"
							value={item}
							onChange={handleCategoryChange}
							checked={category === item}  // Seçili kategori kontrolü
							className="hidden peer" // Görünümünü gizle, ancak işlevi koru
						/>
						{/* Bu label, checkbox'ı temsil eder */}
						<label
							htmlFor={item}
							className="w-5 h-5 border-2 border-gray-500 flex items-center justify-center cursor-pointer peer-checked:bg-green peer-checked:border-transparent"
						>
							{/* Seçildiğinde tick işareti eklemek için */}
							<span
								className={`w-[17px] h-[17px] flex items-center justify-center text-white transition-all duration-300 ${category === item ? "opacity-1" : "opacity-0"
									} peer-checked:opacity-100 peer-checked:scale-100`}
							>
								✔
							</span>
						</label>
						<label htmlFor={item} className="first-letter:uppercase">
							{replaceHyphensWithSpaces(item)}
						</label>
					</div>
				))}
			</div>
			<button className="bg-primary text-white p-[10px] rounded-lg mt-4 w-full" onClick={handleClick}>Filtrele</button>
		</>
	);
};

export default CategorySelect;
