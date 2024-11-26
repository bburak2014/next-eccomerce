
"use client"

import { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const ProductImage = ({ src, alt, width, height, priority }: ProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: "relative", width, height }}>
      {/* Skeleton */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, #f3f3f3, #ecebeb, #f3f3f3)",
            animation: "skeleton-loading 1.5s infinite",
            borderRadius: "8px", // İsteğe bağlı köşe yuvarlama
          }}
        ></div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
        style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.3s ease-in-out" }}
      />
    </div>
  );
};

export default ProductImage;
