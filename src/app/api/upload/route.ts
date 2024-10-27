import { NextRequest, NextResponse } from 'next/server';
import { FileUploadService } from '@/lib/services/upload';
import { ProductError } from '@/lib/exceptions/product';

const uploadService = new FileUploadService();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as 'image' | 'document';
    const oldPath = formData.get('oldPath') as string | undefined;

    const filePath = await uploadService.uploadFile(file, type, oldPath);
    return NextResponse.json({ success: true, path: filePath });
  } catch (error) {
    if (error instanceof ProductError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: '上传失败' },
      { status: 500 }
    );
  }
}
