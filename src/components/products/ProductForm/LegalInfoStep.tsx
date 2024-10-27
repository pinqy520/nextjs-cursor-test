"use client"

import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FileUpload } from '../FileUpload';
import { Product } from '@/types/product';

interface LegalInfoStepProps {
  form: UseFormReturn<Product>;
}

export function LegalInfoStep({ form }: LegalInfoStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="licenseUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>营业执照</FormLabel>
            <FileUpload
              type="document"
              accept="application/pdf"
              value={field.value}
              onChange={field.onChange}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="qualificationUrls"
        render={({ field }) => (
          <FormItem>
            <FormLabel>资质证明文件</FormLabel>
            <FileUpload
              type="document"
              accept="application/pdf"
              value={field.value?.[0]}
              onChange={(path) => {
                const urls = field.value || [];
                field.onChange([...urls, path]);
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
