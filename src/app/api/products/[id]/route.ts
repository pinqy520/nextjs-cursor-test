import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/lib/services/product';
import { ProductError } from '@/lib/exceptions/product';
import { productSchema } from '@/lib/validations/product';

const productService = new ProductService();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await productService.findById(params.id);
    if (!product) {
      return NextResponse.json(
        { error: '产品不存在' },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: '获取产品详情失败' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    // 验证表单数据
    if (body.step === 2) {
      const result = productSchema.safeParse(body.formData);
      if (!result.success) {
        return NextResponse.json(
          { error: result.error.errors[0].message },
          { status: 400 }
        );
      }
    }
    
    const product = await productService.update(params.id, body);
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof ProductError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: '更新产品失败' },
      { status: 500 }
    );
  }
}
