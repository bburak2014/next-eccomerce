"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'

interface PaginationProps {
	totalPages: number;
}
interface HandlePageChange {
	(page: number): void;
}
const Pagination = ({ totalPages }: PaginationProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const router = useRouter();



	const handlePageChange: HandlePageChange = (page) => {
		setCurrentPage(page);
		const limit = 9;
		const skip = (page - 1) * limit;
		router.push(`?limit=${limit}&skip=${skip}`);
	};

	return (
		<div>
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}

			>
				Previous
			</button>
			{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
				<button
					key={page}
					onClick={() => handlePageChange(page)}
				>
					{page}
				</button>
			))}
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;