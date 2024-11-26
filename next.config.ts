import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['cdn.dummyjson.com'],
		formats: ['image/avif', 'image/webp'],

	  },
	
};

export default nextConfig;
