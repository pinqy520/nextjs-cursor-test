import { ProductList } from '@/components/products/ProductList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="space-y-4 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">产品管理</h1>
        <Link href="/dashboard/products/create">
          <Button>创建产品</Button>
        </Link>
      </div>
      <ProductList />
    </div>
  );
}
