import Link from 'next/link'
import React from 'react'
import ProductImage from '../ProductImage'
import { Product } from '@/utils/type'


interface Props {
    data: {
        products: Product[];
    };
}

const Index = (props: Props) => {
    const { data } = props
    return (
        <>
            {data && data?.products.map((product) => (
                <div
                  
                    key={product.id}
                    className="flex flex-col gap-4 shadow-sm"
                >
                    <Link className='flex flex-col gap-4'  href={"/products/" + product.id}>
                    <ProductImage
                        src={product.thumbnail}
                        alt={product.title}
                        width={300}
                        height={300}
                        priority
                    />
                    <div className='flex flex-col gap-1'>
                        <h2 className="font-normal text-black text-base leading-6 tracking-1">{product.title}</h2>
                        <p className="font-normal text-gray text-base leading-6 tracking-1">{product.category}</p>
                        <p className="text-base font-bold leading-6 tracking-1">${product.price}</p>
                    </div>
                    </Link>
                    <button className='font-inter w-full text-white rounded-lg bg-green py-3 font-medium text-sm text-light leading-5	'>Sepete Ekle</button>

                </div>
            ))}
        </>
    )
}

export default Index