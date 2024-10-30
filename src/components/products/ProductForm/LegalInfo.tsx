import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ProductFormState } from "@/types/product";

interface LegalInfoProps {
  data: ProductFormState['data']['legal'];
  onChange: (data: ProductFormState['data']['legal']) => void;
  onSubmit: () => void;
  mode?: "create" | "edit";
}

export function LegalInfo({ 
  data, 
  onChange, 
  onSubmit,
  mode = "create"
}: LegalInfoProps) {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProductFormState['data']['legal']
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === 'supplementalDocs') {
        onChange({
          ...data,
          supplementalDocs: [...data.supplementalDocs, file]
        });
      } else {
        onChange({
          ...data,
          [field]: file
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="businessLicense">
          Business License (PDF) {mode === "edit" && "(Upload new file to update)"}
        </Label>
        <input
          type="file"
          id="businessLicense"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'businessLicense')}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="qualificationCert">
          Qualification Certificate {mode === "edit" && "(Upload new file to update)"}
        </Label>
        <input
          type="file"
          id="qualificationCert"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, 'qualificationCert')}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="supplementalDocs">
          Supplemental Documents {mode === "edit" && "(Upload new files to add)"}
        </Label>
        <input
          type="file"
          id="supplementalDocs"
          accept=".pdf"
          multiple
          onChange={(e) => handleFileChange(e, 'supplementalDocs')}
          className="w-full"
        />
        {data.supplementalDocs.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Selected files:</p>
            <ul className="list-disc list-inside">
              {data.supplementalDocs.map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name}
                  <button
                    onClick={() => {
                      onChange({
                        ...data,
                        supplementalDocs: data.supplementalDocs.filter((_, i) => i !== index)
                      });
                    }}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button onClick={onSubmit} className="w-full">
          {mode === "edit" ? "Update" : "Submit"} Product
        </Button>
      </div>
    </div>
  );
} 