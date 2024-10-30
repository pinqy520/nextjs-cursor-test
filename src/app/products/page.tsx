"use client";

import { useState, useEffect } from "react";
import { ProductTable } from "@/components/products/ProductList/ProductTable";
import { SearchFilters } from "@/components/products/ProductList/SearchFilters";
import { Pagination } from "@/components/products/ProductList/Pagination";
import { ProductType } from "@/types/product";
import { useRouter } from "next/navigation";

export default function ProductListPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter state
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<ProductType[]>([]);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: pageSize.toString(),
        ...(search && { search }),
        ...(selectedTypes.length && { type: selectedTypes.join(",") }),
        ...(dateRange.start && { startDate: dateRange.start }),
        ...(dateRange.end && { endDate: dateRange.end }),
      });

      const response = await fetch(`/api/products?${searchParams}`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.pagination.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize, search, selectedTypes, dateRange]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/products/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");
      
      // Refresh the product list
      fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/products/${id}/edit`);
  };

  const handleView = (id: string) => {
    router.push(`/products/${id}`);
  };

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => router.push("/products/new")}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          Add New Product
        </button>
      </div>

      <div className="mb-6">
        <SearchFilters
          search={search}
          type={selectedTypes}
          dateRange={dateRange}
          onSearchChange={setSearch}
          onTypeChange={setSelectedTypes}
          onDateRangeChange={setDateRange}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <ProductTable
            products={products}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onView={handleView}
          />

          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
        </>
      )}
    </div>
  );
} 