"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  quality?: number;
  width?: number | `${number}` | undefined;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  sizes?: string; // Kullanıcıya özel boyut
}

const ProductImage = ({ 
  src, 
  alt, 
  quality = 75, 
  width = 100, 
  height = 100, 
  fill = false, 
  priority = false, 
  unoptimized = false, 
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Varsayılan değer
}: ProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        position: "relative",
        width: fill ? "100%" : `${width}px`,
        paddingBottom: fill ? "100%" : undefined,
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
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
            borderRadius: "8px",
          }}
        ></div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
        sizes={fill ? sizes : undefined} // Sadece fill için sizes eklenir
        onLoad={() => setIsLoading(false)}
        style={{
          objectFit: "contain",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
        quality={quality}
        unoptimized={unoptimized}
      />
    </div>
  );
};

export default ProductImage;
