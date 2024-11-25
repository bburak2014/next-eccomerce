//pagination
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    // URL parametrelerinden 'page' değerini almak
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam) : 1; // Varsayılan olarak 1. sayfayı al
  });
 
  const [error, setError] = useState<string | null>(null); // Hata mesajı durumu

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = Number(pageParam);
      if (page < 1 || page > totalPages) {
        setError(`Geçersiz sayfa numarası. Lütfen 1 ile ${totalPages} arasında bir sayfa girin.`);
        setCurrentPage(1); // Hatalı sayfa girişi durumunda, 1. sayfaya dön
      } else {
        setError(null); // Sayfa geçerli ise hatayı sıfırla
        setCurrentPage(page);
      }
    }
  }, [searchParams, totalPages]); // Sayfa parametreleri değiştiğinde kontrol et

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Geçersiz sayfa numarasını engelle
    setCurrentPage(page);

    const limit = 9; // Sayfa başına gösterilecek ürün sayısı
    const skip = (page - 1) * limit; // Sayfa numarasına göre 'skip' değeri hesapla

    // URL'yi yeni sayfa numarası, limit ve skip ile güncelle
    router.replace(`?page=${page}&limit=${limit}&skip=${skip}`); // Yönlendirme yerine güncelleme yap
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Hata mesajını göster */}

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Önceki
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sonraki
      </button>
    </div>
  );
};

export default Pagination;
