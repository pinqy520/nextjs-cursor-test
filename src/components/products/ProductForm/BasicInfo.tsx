import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductType, ProductTypes, ProductStatus, ProductStatuses } from "@/types/product";

interface BasicInfoProps {
  data: {
    name: string;
    type: ProductType;
    description: string;
    image?: File | null;
    tags: string[];
    status: ProductStatus;
  };
  onChange: (data: BasicInfoProps['data']) => void;
}

export function BasicInfo({ data, onChange }: BasicInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
      </div>
      
      <div>
        <Label htmlFor="type">Product Type</Label>
        <select
          id="type"
          value={data.type}
          onChange={(e) => onChange({ ...data, type: e.target.value as ProductType })}
          className="w-full rounded-md border"
        >
          {Object.values(ProductTypes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          className="w-full rounded-md border"
          rows={4}
        />
      </div>
      
      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={data.status}
          onChange={(e) => onChange({ 
            ...data, 
            status: e.target.value as ProductStatus 
          })}
          className="w-full rounded-md border"
        >
          {Object.values(ProductStatuses).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 