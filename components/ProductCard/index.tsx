import Link from 'next/link';
import React from 'react';
import ProductImage from '../ProductImage';
import { Product } from '@/utils/type';
import StarFillIcon from '@/components/icons/StarFillIcon';
import StarOutletIcon from '@/components/icons/StarOutletIcon';
import StarCreate from '@/components/StarCreate';
import ProductAddCartButton from '@/components/ProductAddCartButton';


interface Props {
	data: {
		products: Product[];
	};
}

const Index = (props: Props) => {
	const { data } = props;


	return (
		<>
			{data && data?.products.map((product) => (
				<div
					key={product.id}
					className="flex flex-col gap-4 shadow-sm"
				>
					<Link className='flex flex-col gap-4' href={"/products/" + product.id}>
						<ProductImage
							src={product.thumbnail}
							alt={product.title}
							fill={true}
						/>
						<div className='flex flex-col gap-1'>
							<h2 className="font-normal text-black text-base leading-6 tracking-1">{product.title}</h2>
							<p className="font-normal text-gray text-base leading-6 tracking-1">{product.category}</p>
							<p className="text-base font-bold leading-6 tracking-1">${product.price}</p>
							<div className="flex gap-[9.6px]">
								<StarCreate data={product.rating} svg={<StarFillIcon />} svgOutlined={<StarOutletIcon />} />
							</div>
						</div>
					</Link>
					<ProductAddCartButton productId={product.id} price={product.price} title={product.title} thumbnail={product.thumbnail} />
				</div>
			))}
		</>
	);
};

export default Index;