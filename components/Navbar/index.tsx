"use client";

import Image from 'next/image';
import Link from 'next/link';
import LoadingUI from '@/components/LoadingUI';
import Cart from '@/components/Cart';
import { useUserData } from '@/app/context/UserContext';
import React, { useState, useEffect, useRef } from 'react';
 
export default function Navbar() {
  const { userData } = useUserData(); 
  const { firstName, lastName } = userData || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCart, setshowCart] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        {userData ? (
          <div className='relative flex items-center gap-4 leading-6'>
            {(firstName || lastName) && (
              <div className='flex items-center justify-center font-bold text-green rounded-full bg-green-custom-1 w-44 h-44'>
                <span>{firstName?.charAt(0)}</span>
                <span>{lastName?.charAt(0)}</span>
              </div>
            )}
            {(firstName || lastName) && (
              <button ref={buttonRef} onClick={toggleDropdown} className='flex items-center gap-1 font-normal text-primary'>
                <span>{firstName}</span>
                <span>{lastName}</span>
                <Image src="/icons/arrow-down.svg" alt="arrow-down" width={20} height={20} />
              </button>
            )}
            {isDropdownOpen && (
              <div ref={dropdownRef} className='absolute right-0 top-10 mt-2 p-2 w-48 bg-white border border-gray-custom-2 border-0.5 text-gray-custom-1 rounded-lg shadow-lg'>
				<button onClick={()=>setshowCart(!showCart)} className='block px-4 py-2 w-full text-gray-800 hover:bg-slate-100 hover:text-black-custom-1 transition duration-300 rounded-lg text-start'>
				  Sepetim
				</button>
				<button  className='block px-4 py-2 text-gray-800 hover:bg-slate-100 hover:text-black-custom-1 transition duration-300 rounded-lg'>
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        ) : (
          <LoadingUI height='20px' classCustom="w-6 h-6" />
        )}
      </div>
	  {showCart &&  <Cart setshowCart={setshowCart} />}
    </div>
  );
}