export const ProductTypes = {
  PHYSICAL: 'PHYSICAL',
  DIGITAL: 'DIGITAL',
  SERVICE: 'SERVICE'
} as const;

export type ProductType = typeof ProductTypes[keyof typeof ProductTypes];

export const ProductStatuses = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED'
} as const;

export type ProductStatus = typeof ProductStatuses[keyof typeof ProductStatuses];

export interface Product {
  id: string;
  productId: string;
  name: string;
  type: ProductType;
  description: string;
  imageUrl?: string | null;
  tags: string[];
  status: ProductStatus;
  webhookUrl: string;
  callbackKey: string;
  apiVersion?: string | null;
  businessLicense: string;
  qualificationCert: string;
  supplementalDocs: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormState {
  step: number;
  data: {
    basic: {
      name: string;
      type: ProductType;
      description: string;
      image?: File | null;
      tags: string[];
      status: ProductStatus;
    };
    access: {
      productId: string;
      webhookUrl: string;
      callbackKey: string;
      apiVersion?: string;
    };
    legal: {
      businessLicense: File | null;
      qualificationCert: File | null;
      supplementalDocs: File[];
    };
  };
} 