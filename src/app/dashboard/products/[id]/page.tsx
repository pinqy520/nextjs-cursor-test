import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductService } from '@/lib/services/product';
import { ProductDetail } from '@/components/products/ProductDetail';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
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
        <h1 className="text-2xl font-bold">产品详情</h1>
        <div className="space-x-2">
          <Link href={`/dashboard/products/${encodeURIComponent(product.id)}/edit`}>
            <Button variant="outline">编辑</Button>
          </Link>
          <Link href="/dashboard/products">
            <Button variant="outline">返回列表</Button>
          </Link>
        </div>
      </div>
      <ProductDetail product={product} />
    </div>
  );
}
