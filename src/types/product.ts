export type ProductType = 'SAAS' | 'API' | 'SDK' | 'OTHER';
export type ProductStatus = 'draft' | 'active' | 'inactive';

export interface Product {
  id: string;
  name: string;
  description?: string;
  type: ProductType;
  status: ProductStatus;
  imageUrl?: string;
  tags: string[];
  
  webhookUrl: string;
  secretKey: string;
  apiVersion?: string;
  notifyConfig?: {
    retryTimes: number;
    retryInterval: number;
    timeout: number;
  };
  retryStrategy?: {
    maxRetries: number;
    retryDelay: number;
  };
  
  licenseUrl?: string;
  qualificationUrls: string[];
  
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface ProductFormData {
  step: number;
  data: Partial<Product>;
  isDraft: boolean;
}

// 表单默认值类型
export const defaultProductFormValues: Partial<Product> = {
  type: 'OTHER',
  status: 'draft',
  tags: [],
  qualificationUrls: [],
};
