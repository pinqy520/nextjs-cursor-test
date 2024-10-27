"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import Link from 'next/link';
import { Pagination } from "@/components/ui/pagination";

interface ProductTableProps {
  params: {
    page: number;
    pageSize: number;
    name?: string;
    type?: string[];
    status?: string;
    startDate?: string;
    endDate?: string;
  };
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function ProductTable({ params, isLoading, setIsLoading }: ProductTableProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    pageSize: 10,
  });

  // 使用 JSON.stringify(params) 作为依赖项
  const searchParamsString = JSON.stringify(params);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams();
        const parsedParams = JSON.parse(searchParamsString);
        
        Object.entries(parsedParams).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v));
          } else if (value) {
            searchParams.set(key, String(value));
          }
        });

        const res = await fetch(`/api/products?${searchParams.toString()}`);
        const data = await res.json();
        
        setProducts(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error('获取产品列表失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchParamsString, setIsLoading]);

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-muted-foreground">加载中...</div>
        </div>
      ) : products.length === 0 ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-muted-foreground">暂无数据</div>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>产品ID</TableHead>
                <TableHead>产品名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <Link href={`/dashboard/products/${encodeURIComponent(product.id)}`}>
                        <Button variant="outline" size="sm">
                          查看
                        </Button>
                      </Link>
                      <Link href={`/dashboard/products/${encodeURIComponent(product.id)}/edit`}>
                        <Button variant="outline" size="sm">
                          编辑
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            total={pagination.total}
            pageSize={pagination.pageSize}
            current={pagination.current}
            onChange={(page, pageSize) => {
              const newParams = new URLSearchParams(window.location.search);
              newParams.set('page', String(page));
              newParams.set('pageSize', String(pageSize));
              router.push(`/dashboard/products?${newParams.toString()}`);
            }}
          />
        </>
      )}
    </div>
  );
}
