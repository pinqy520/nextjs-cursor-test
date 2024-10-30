import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductType, ProductTypes } from "@/types/product";

interface SearchFiltersProps {
  search: string;
  type: ProductType[];
  dateRange: {
    start: string;
    end: string;
  };
  onSearchChange: (search: string) => void;
  onTypeChange: (types: ProductType[]) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
}

export function SearchFilters({
  search,
  type,
  dateRange,
  onSearchChange,
  onTypeChange,
  onDateRangeChange,
}: SearchFiltersProps) {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or ID..."
        />
      </div>

      <div>
        <Label>Product Type</Label>
        <div className="space-x-2">
          {Object.values(ProductTypes).map((productType) => (
            <label key={productType} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={type.includes(productType)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onTypeChange([...type, productType]);
                  } else {
                    onTypeChange(type.filter((t) => t !== productType));
                  }
                }}
                className="rounded border-gray-300"
              />
              <span className="ml-2">{productType}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, start: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, end: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
} 