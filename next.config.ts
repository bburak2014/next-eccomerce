import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	images: {
		formats: ['image/avif', 'image/webp'], // AVIF ve WebP formatlarını etkinleştir

		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.dummyjson.com',
				pathname: '/products/images/**',
			},
		],
	},

};

export default nextConfig;
