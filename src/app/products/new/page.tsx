"use client";

import { ProductForm } from "@/components/products/ProductForm/ProductForm";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Product</h1>
      </div>
      
      <ProductForm 
        mode="create"
        onSuccess={() => {
          router.push('/products');
        }}
      />
    </div>
  );
} 