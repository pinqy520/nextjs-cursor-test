"use client"

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductType, ProductStatus } from '@/types/product';

interface SearchFormProps {
  defaultValues: {
    name: string;
    type: string[];
    status?: ProductStatus;
    startDate?: string;
    endDate?: string;
  };
  onSearch: (values: any) => void;
}

export function SearchForm({ defaultValues, onSearch }: SearchFormProps) {
  const form = useForm({
    defaultValues
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)} className="grid grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>产品名称</FormLabel>
              <FormControl>
                <Input placeholder="搜索品名称" {...field} />
              </FormControl>
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
                value={field.value?.[0] || ''} // 修改这里，只使用第一个选择的值
                onValueChange={(value) => field.onChange([value])} // 修改这里，将值包装成数组
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
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>状态</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">草稿</SelectItem>
                  <SelectItem value="active">已启用</SelectItem>
                  <SelectItem value="inactive">已停用</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="flex items-end space-x-2">
          <Button type="submit">搜索</Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => form.reset(defaultValues)}
          >
            重置
          </Button>
        </div>
      </form>
    </Form>
  );
}
