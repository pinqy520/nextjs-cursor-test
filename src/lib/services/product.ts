import { prisma } from '@/lib/prisma';
import { Product, ProductFormData } from '@/types/product';
import { ProductError } from '@/lib/exceptions/product';
import type { Prisma } from '@prisma/client';

export class ProductService {
  // 将数据库模型转换为业务模型
  private toProduct(dbProduct: any): Product {
    return {
      ...dbProduct,
      tags: dbProduct.tags ? dbProduct.tags.split(',') : [],
      notifyConfig: dbProduct.notifyConfig ? JSON.parse(dbProduct.notifyConfig) : undefined,
      retryStrategy: dbProduct.retryStrategy ? JSON.parse(dbProduct.retryStrategy) : undefined,
      qualificationUrls: dbProduct.qualificationUrls ? dbProduct.qualificationUrls.split(',') : [],
    };
  }

  // 将业务模型转换为数据库模型
  private toDbProduct(product: Partial<Product>): Prisma.ProductCreateInput {
    if (!product.id) {
      throw new ProductError(
        'INVALID_PRODUCT_ID',
        '产品ID是必填项'
      );
    }

    return {
      id: product.id,
      name: product.name || '',
      description: product.description,
      type: product.type || 'OTHER',
      status: product.status || 'draft',
      imageUrl: product.imageUrl,
      tags: product.tags?.join(',') || '',
      webhookUrl: product.webhookUrl || '',
      secretKey: product.secretKey || '',
      apiVersion: product.apiVersion,
      notifyConfig: product.notifyConfig ? JSON.stringify(product.notifyConfig) : null,
      retryStrategy: product.retryStrategy ? JSON.stringify(product.retryStrategy) : null,
      qualificationUrls: product.qualificationUrls?.join(',') || '',
      createdBy: product.createdBy || 'system',
      updatedBy: product.updatedBy || 'system',
    };
  }

  async create(data: ProductFormData): Promise<Product> {
    const { id } = data.data;
    
    if (!id) {
      throw new ProductError(
        'INVALID_PRODUCT_ID',
        '产品ID是必填项'
      );
    }
    
    // 检查产品ID是否已存在
    const exists = await prisma.product.findUnique({
      where: { id }
    });
    
    if (exists) {
      throw new ProductError(
        'PRODUCT_ID_EXISTS',
        '产品ID已存在'
      );
    }
    
    const dbProduct = await prisma.product.create({
      data: this.toDbProduct({
        ...data.data,
        status: data.isDraft ? 'draft' : 'active'
      })
    });

    return this.toProduct(dbProduct);
  }
  
  async update(id: string, data: ProductFormData): Promise<Product> {
    const dbProduct = await prisma.product.update({
      where: { id },
      data: this.toDbProduct({
        ...data.data,
        status: data.isDraft ? 'draft' : 'active'
      })
    });

    return this.toProduct(dbProduct);
  }
  
  async findById(id: string): Promise<Product | null> {
    const dbProduct = await prisma.product.findUnique({
      where: { id }
    });

    return dbProduct ? this.toProduct(dbProduct) : null;
  }
  
  async list(params: {
    page?: number;
    pageSize?: number;
    name?: string;
    type?: string[];
    status?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const { page = 1, pageSize = 10 } = params;
    
    const where = {
      ...(params.name && {
        name: { contains: params.name }
      }),
      ...(params.type?.length && {
        type: { in: params.type }
      }),
      ...(params.status && {
        status: params.status
      }),
      ...(params.startDate && params.endDate && {
        createdAt: {
          gte: new Date(params.startDate),
          lte: new Date(params.endDate)
        }
      })
    };
    
    const [total, dbProducts] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' }
      })
    ]);
    
    return {
      data: dbProducts.map(this.toProduct),
      pagination: {
        total,
        current: page,
        pageSize
      }
    };
  }
}
