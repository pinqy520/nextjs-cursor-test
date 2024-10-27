"use client"

import { useState } from 'react';
import { SearchForm } from './SearchForm';
import { ProductTable } from './ProductTable';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductType, ProductStatus } from '@/types/product';

export function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // 获取当前搜索参数
  const currentParams = {
    page: Number(searchParams.get('page')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 10,
    name: searchParams.get('name') || '',
    type: searchParams.getAll('type') as ProductType[],
    status: searchParams.get('status') as ProductStatus || undefined,
    startDate: searchParams.get('startDate') || undefined,
    endDate: searchParams.get('endDate') || undefined,
  };

  // 处理搜索
  const handleSearch = (values: typeof currentParams) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v));
      } else if (value) {
        params.set(key, String(value));
      }
    });
    router.push(`/dashboard/products?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <SearchForm 
        defaultValues={currentParams}
        onSearch={handleSearch}
      />
      <ProductTable 
        params={currentParams}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}
