'use client';

import { useState } from 'react';

export default function ProductFilter() {
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('');

	const handleSearch = () => {
		// CSR ile API'den filtrelenmiş ürünleri getir
		console.log('Arama:', search, 'Kategori:', category);
	};

	return (
		<div className="mb-4 flex space-x-4">
			<input
				type="text"
				placeholder="Ara"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="p-2 border rounded w-1/2"
			/>
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				className="p-2 border rounded w-1/4"
			>
				<option value="">Kategori Seç</option>
				<option value="electronics">Elektronik</option>
				<option value="fashion">Moda</option>
			</select>
			<button
				onClick={handleSearch}
				className="bg-blue-500 text-white p-2 rounded"
			>
				Filtrele
			</button>
		</div>
	);
}
