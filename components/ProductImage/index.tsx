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
}

const ProductImage = ({ src, alt, quality = 75, width = 100, height=100, fill = false }: ProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div
      style={{
        position: "relative",
        width: fill ? "100%" : width, // Ebeveynin genişliğini kaplar
        paddingBottom: fill ? "100%" : undefined, // 1:1 en-boy oranı için
        overflow: "hidden",
        borderRadius: "8px", // İsteğe bağlı yuvarlatma
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
        onLoadingComplete={() => setIsLoading(false)}
        style={{
          objectFit: "cover", // Görüntüyü kırpmadan doldur
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
        quality={quality}
      />
    </div>
  );
};

export default ProductImage;