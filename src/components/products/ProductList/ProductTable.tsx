import { Product } from "@/types/product";
import { ProductStatuses } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  onStatusChange: (id: string, status: string) => void;
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  loading?: boolean;
}

export function ProductTable({ 
  products, 
  onStatusChange, 
  onEdit, 
  onView,
  loading = false 
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No products found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-4 py-2 text-left">Product ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Created</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{product.productId}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.type}</td>
              <td className="px-4 py-2">
                <select
                  value={product.status}
                  onChange={(e) => onStatusChange(product.id, e.target.value)}
                  className="rounded border px-2 py-1"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                  <option value="DISABLED">Disabled</option>
                </select>
              </td>
              <td className="px-4 py-2">
                {new Date(product.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onView(product.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(product.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 