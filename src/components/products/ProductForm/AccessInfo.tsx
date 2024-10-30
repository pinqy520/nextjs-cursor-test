import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProductFormState } from "@/types/product";

interface AccessInfoProps {
  data: ProductFormState['data']['access'];
  onChange: (data: ProductFormState['data']['access']) => void;
  readOnlyFields?: string[];
}

export function AccessInfo({ 
  data, 
  onChange,
  readOnlyFields = [] 
}: AccessInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="productId">Product ID</Label>
        <Input
          id="productId"
          value={data.productId}
          onChange={(e) => onChange({ ...data, productId: e.target.value })}
          placeholder="Enter product ID (letters and underscores only)"
          readOnly={readOnlyFields.includes("productId")}
        />
      </div>

      <div>
        <Label htmlFor="webhookUrl">Webhook URL</Label>
        <Input
          id="webhookUrl"
          type="url"
          value={data.webhookUrl}
          onChange={(e) => onChange({ ...data, webhookUrl: e.target.value })}
          placeholder="https://your-webhook-url.com"
        />
      </div>

      <div>
        <Label htmlFor="callbackKey">Callback Verification Key</Label>
        <Input
          id="callbackKey"
          value={data.callbackKey}
          onChange={(e) => onChange({ ...data, callbackKey: e.target.value })}
          placeholder="Enter callback key"
        />
      </div>

      <div>
        <Label htmlFor="apiVersion">API Version (Optional)</Label>
        <Input
          id="apiVersion"
          value={data.apiVersion || ''}
          onChange={(e) => onChange({ ...data, apiVersion: e.target.value })}
          placeholder="e.g., v1.0"
        />
      </div>
    </div>
  );
} 