
"use client";

import Image from 'next/image';
import Link from 'next/link';
import LoadingUI from '@/components/LoadingUI';
import { useUserData } from '@/app/context/UserContext';

 

export default  function Navbar() {
	const { userData } = useUserData(); // Global kullanıcı verisini alıyoruz
 
	const { firstName, lastName } = userData || {};
 
	return (
		<div className='flex items-center flex-wrap gap-4 justify-center sm:justify-between px-8 py-7 sticky top-0 left-0 w-full bg-white border-b-2 border-b-customBorder z-50'>
			<Link href={'/products'}>
				<Image src="/images/LogoProduct.png" alt="logo" width={170} height={35} priority />
			</Link>
			<div className='flex items-center gap-4'>
				<div className='flex items-center gap-4'>
					<Image src="/icons/search.svg" alt="search" width={24} height={24} />
					<Image src="/icons/error.svg" alt="error" width={24} height={24} />
					<Image src="/icons/notification.svg" alt="notification" width={24} height={24} />
				</div>
				{userData ?
					<div className='flex items-center gap-4 leading-6 '>
						{(firstName || lastName) && <div className='flex items-center  justify-center font-bold text-green rounded-full bg-green-custom-1 w-44 h-44'>
							<span>{firstName?.charAt(0)}</span>
							<span>{lastName?.charAt(0)}</span>
						</div>}
						{(firstName || lastName) && <p className='flex items-center gap-1 font-normal text-primary'>
							<span>{firstName}</span>
							<span>{lastName}</span>
 							<Image src="/icons/arrow-down.svg" alt="arrow-down" width={20} height={20} />
						</p>}
					</div>
					:
					<LoadingUI height='20px' classCustom="w-6 h-6" />
				}
			</div>
		</div>
	);
};

