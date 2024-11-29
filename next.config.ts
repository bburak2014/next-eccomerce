import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
			  protocol: 'https',
			  hostname: 'cdn.dummyjson.com',
			  pathname: '/products/images/**',
			},
		  ],	  },
	
};

export default nextConfig;
