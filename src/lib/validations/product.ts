import { z } from 'zod';
import { ProductType, ProductStatus } from '@/types/product';

export const productSchema = z.object({
  name: z.string()
    .min(2, '产品名称至少2个字符')
    .max(50, '产品名称最多50个字符'),
  type: z.enum(['SAAS', 'API', 'SDK', 'OTHER'] as const),
  description: z.string().optional(),
  status: z.enum(['draft', 'active', 'inactive'] as const),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).default([]),
  
  id: z.string()
    .regex(/^[a-zA-Z_]+$/, '产品ID只能包含英文字母和下划线'),
  webhookUrl: z.string().url('请输入有效的Webhook URL'),
  secretKey: z.string().min(16, '密钥至少16个字符'),
  apiVersion: z.string().optional(),
  
  notifyConfig: z.object({
    retryTimes: z.number().min(0).max(10),
    retryInterval: z.number().min(1000),
    timeout: z.number().min(1000),
  }).optional(),
  
  retryStrategy: z.object({
    maxRetries: z.number().min(0).max(10),
    retryDelay: z.number().min(1000),
  }).optional(),
  
  licenseUrl: z.string().optional(),
  qualificationUrls: z.array(z.string()).default([]),
  
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

export type ProductFormSchema = z.infer<typeof productSchema>;
