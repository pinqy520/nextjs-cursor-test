"use client"

import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUpload } from '../FileUpload';
import { Product } from '@/types/product';

interface BasicInfoStepProps {
  form: UseFormReturn<Product>;
}

export function BasicInfoStep({ form }: BasicInfoStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>产品名称</FormLabel>
            <FormControl>
              <Input placeholder="请输入产品名称" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>产品类型</FormLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择产品类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SAAS">SAAS</SelectItem>
                <SelectItem value="API">API</SelectItem>
                <SelectItem value="SDK">SDK</SelectItem>
                <SelectItem value="OTHER">其他</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>产品描述</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="请输入产品描述"
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>产品图片</FormLabel>
            <FileUpload
              type="image"
              accept="image/jpeg,image/png"
              value={field.value}
              onChange={field.onChange}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
