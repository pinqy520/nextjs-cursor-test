import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { ProductError } from '@/lib/exceptions/product';

export class FileUploadService {
  private readonly uploadDir = path.join(process.cwd(), 'public/uploads');
  private readonly allowedImageTypes = ['image/jpeg', 'image/png'];
  private readonly allowedDocTypes = ['application/pdf'];
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor() {
    // 确保上传目录存在
    this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    try {
      await mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('创建上传目录失败:', error);
    }
  }

  async uploadFile(
    file: File,
    type: 'image' | 'document',
    oldPath?: string
  ): Promise<string> {
    // 验证文件类型
    const allowedTypes = type === 'image' 
      ? this.allowedImageTypes 
      : this.allowedDocTypes;
      
    if (!allowedTypes.includes(file.type)) {
      throw new ProductError(
        'INVALID_FILE_TYPE',
        '不支持的文件类型'
      );
    }

    // 验证文件大小
    if (file.size > this.maxFileSize) {
      throw new ProductError(
        'FILE_TOO_LARGE',
        '文件大小不能超过5MB'
      );
    }

    // 生成文件名
    const ext = path.extname(file.name);
    const fileName = `${crypto.randomUUID()}${ext}`;
    const relativePath = `/uploads/${fileName}`;
    const fullPath = path.join(this.uploadDir, fileName);

    // 保存文件
    const buffer = await file.arrayBuffer();
    await writeFile(fullPath, Buffer.from(buffer));

    // 如果存在旧文件，删除它
    if (oldPath) {
      await this.deleteFile(oldPath);
    }

    return relativePath;
  }

  async deleteFile(filePath: string): Promise<void> {
    if (!filePath) return;
    
    const fullPath = path.join(process.cwd(), 'public', filePath);
    try {
      await unlink(fullPath);
    } catch (error) {
      console.error('删除文件失败:', error);
    }
  }
}
