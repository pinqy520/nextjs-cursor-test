export class ProductError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, string>
  ) {
    super(message);
    this.name = 'ProductError';
  }
}

export const ProductErrorCodes = {
  PRODUCT_ID_EXISTS: {
    code: 'PRODUCT_ID_EXISTS',
    message: '产品ID已存在',
  },
  INVALID_PRODUCT_ID: {
    code: 'INVALID_PRODUCT_ID',
    message: '无效的产品ID格式',
  },
  FILE_TOO_LARGE: {
    code: 'FILE_TOO_LARGE',
    message: '文件大小超过限制',
  },
  INVALID_FILE_TYPE: {
    code: 'INVALID_FILE_TYPE',
    message: '不支持的文件类型',
  },
} as const;
