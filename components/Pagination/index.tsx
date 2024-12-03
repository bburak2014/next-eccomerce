import Link from 'next/link';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	searchQuery?: string;
	categoryQuery?: string;
}

const Pagination = ({ currentPage, totalPages, searchQuery, categoryQuery }: PaginationProps) => {
	// pagination logic
	const maxPageNumbersToShow = 3;
	const halfRange = Math.floor(maxPageNumbersToShow / 2);

	let startPage = Math.max(currentPage - halfRange, 1);
	let endPage = Math.min(currentPage + halfRange, totalPages);

	// pagination logic
	if (currentPage <= halfRange) {
		startPage = 1;
		endPage = Math.min(maxPageNumbersToShow, totalPages);
	} else if (totalPages - currentPage < halfRange) {
		startPage = Math.max(totalPages - maxPageNumbersToShow + 1, 1);
		endPage = totalPages;
	}

	const generateLink = (page: number) => (
		<Link
			key={page}
			href={`/products?page=${page}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}${categoryQuery ? `&category=${encodeURIComponent(categoryQuery)}` : ""}`}
			className={`h-8 w-8 flex justify-center items-center border-1 rounded-lg  ${page === currentPage ? "bg-green text-white border-green" : "bg-white text-primary border-customBorder "}`}
			aria-label={`Sayfa ${page}`}
		>
			{page}
		</Link>
	);

	return (
		<div className="mt-8 flex justify-center items-center space-x-2  font-bold font-inter">

			<Link
				href={`/products?page=${currentPage - 1}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}${categoryQuery ? `&category=${encodeURIComponent(categoryQuery)}` : ""}`}
				className={` ${currentPage > 1 ? "pointer-events-auto text-primary" : "pointer-events-none text-tertiary"}`}
				aria-label={`Sayfa ${currentPage - 1}`}

			>
				Prev
			</Link>

			{/* page numbers */}
			{startPage > 1 && (
				<>
					<Link
						href={`/products?page=1${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}${categoryQuery ? `&category=${encodeURIComponent(categoryQuery)}` : ""}`}
						className="h-8 w-8 flex justify-center items-center border-2 border-customBorder rounded bg-white text-primary "
						aria-label="Sayfa 1"
					>
						1
					</Link>

				</>
			)}

			{Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(generateLink)}
			{endPage < totalPages && (
				<>
					{endPage < totalPages - 1 && (
						<span className="p-2">...</span>
					)}
					<Link
						href={`/products?page=${totalPages}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}${categoryQuery ? `&category=${encodeURIComponent(categoryQuery)}` : ""}`}
						className="h-8 w-8 flex justify-center items-center border-1 border-customBorder rounded-lg bg-white text-primary "
						aria-label={`Sayfa ${totalPages}`}
					>
						{totalPages}
					</Link>
				</>
			)}

			{/* next page link */}
			<Link
				href={`/products?page=${currentPage + 1}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}${categoryQuery ? `&category=${encodeURIComponent(categoryQuery)}` : ""}`}
				className={` ${currentPage < totalPages ? "pointer-events-auto text-primary" : "pointer-events-none text-tertiary"}`}
				aria-label={`Sayfa ${currentPage + 1}`}
			>
				Sonraki
			</Link>

		</div>
	);
};

export default Pagination;
