import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/lib/services/product';
import { ProductError } from '@/lib/exceptions/product';
import { productSchema } from '@/lib/validations/product';

const productService = new ProductService();

export async function POST(req: NextRequest) {
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
    
    const product = await productService.create(body);
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof ProductError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: '创建产品失败' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const params = {
      page: Number(searchParams.get('page')) || 1,
      pageSize: Number(searchParams.get('pageSize')) || 10,
      name: searchParams.get('name') || undefined,
      type: searchParams.getAll('type'),
      status: searchParams.get('status') || undefined,
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
    };
    
    const result = await productService.list(params);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: '获取产品列表失败' },
      { status: 500 }
    );
  }
}
