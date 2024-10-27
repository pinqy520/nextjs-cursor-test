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
import { Product } from '@/types/product';

interface IntegrationStepProps {
  form: UseFormReturn<Product>;
  disabled?: boolean; // 添加禁用状态
}

export function IntegrationStep({ form, disabled }: IntegrationStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>产品ID</FormLabel>
            <FormControl>
              <Input 
                placeholder="请输入产品ID（仅支持英文字母和下划线）"
                disabled={disabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="webhookUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Webhook URL</FormLabel>
            <FormControl>
              <Input 
                placeholder="请输入Webhook URL"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="secretKey"
        render={({ field }) => (
          <FormItem>
            <FormLabel>回调验证密钥</FormLabel>
            <FormControl>
              <Input 
                type="password"
                placeholder="请输入回调验证密钥"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="apiVersion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>API版本</FormLabel>
            <FormControl>
              <Input 
                placeholder="请输入API版本"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
