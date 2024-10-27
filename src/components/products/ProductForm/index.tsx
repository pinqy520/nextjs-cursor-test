"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { productSchema } from '@/lib/validations/product';
import { Product, defaultProductFormValues } from '@/types/product';
import { BasicInfoStep } from './BasicInfoStep';
import { IntegrationStep } from './IntegrationStep';
import { LegalInfoStep } from './LegalInfoStep';
import { StepProgress } from './StepProgress';

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: product || defaultProductFormValues,
  });

  const onSubmit = async (isDraft: boolean) => {
    try {
      setIsSubmitting(true);
      const formData = form.getValues();
      
      const url = product 
        ? `/api/products/${product.id}`
        : '/api/products';

      const res = await fetch(url, {
        method: product ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          step,
          data: formData,
          isDraft,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      toast({
        title: isDraft 
          ? '已保存为草稿' 
          : product 
            ? '产品更新成功'
            : '产品创建成功',
      });

      if (!isDraft) {
        router.push('/dashboard/products');
      }
    } catch (error) {
      toast({
        title: '保存失败',
        description: error instanceof Error ? error.message : '未知错误',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    const fields = getFieldsByStep(step);
    form.trigger(fields).then((isValid) => {
      if (isValid) {
        setStep((prev) => Math.min(3, prev + 1));
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <StepProgress currentStep={step} />
        
        <div className="space-y-6">
          {step === 1 && <BasicInfoStep form={form} />}
          {step === 2 && (
            <IntegrationStep 
              form={form} 
              disabled={!!product} // 编辑时禁用产品ID输入
            />
          )}
          {step === 3 && <LegalInfoStep form={form} />}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            disabled={step === 1 || isSubmitting}
          >
            上一步
          </Button>

          <div className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onSubmit(true)}
              disabled={isSubmitting}
            >
              保存草稿
            </Button>

            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
              >
                下一步
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => onSubmit(false)}
                disabled={isSubmitting}
              >
                {product ? '更新' : '提交'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}

// 根据步骤获取需要验证的字段
function getFieldsByStep(step: number): Array<keyof Product> {
  switch (step) {
    case 1:
      return ['name', 'type', 'description'];
    case 2:
      return ['id', 'webhookUrl', 'secretKey'];
    case 3:
      return ['licenseUrl'];
    default:
      return [];
  }
}
