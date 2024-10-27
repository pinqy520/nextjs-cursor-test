import { ProductForm } from '@/components/products/ProductForm';

export default function CreateProductPage() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">创建产品</h1>
      </div>
      <ProductForm />
    </div>
  );
}
