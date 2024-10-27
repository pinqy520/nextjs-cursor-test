import { ProductForm } from '@/components/products/ProductForm';
import { ProductService } from '@/lib/services/product';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const productService = new ProductService();
  // 解码 URL 中的产品 ID
  const decodedId = decodeURIComponent(params.id);
  const product = await productService.findById(decodedId);

  if (!product) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">产品不存在</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">编辑产品</h1>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
