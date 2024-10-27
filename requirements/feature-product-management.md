# 产品管理功能设计文档

## 1. 需求概述
### 1.1 功能概述
产品管理模块主要包含两个核心功能：产品接入和产品列表管理。该模块旨在提供完整的产品生命周期管理能力。

### 1.2 功能清单
- 产品接入（分步表单）
- 产品列表管理
- 产品搜索
- 产品状态管理

## 2. 功能需求
### 2.1 产品接入
#### 2.1.1 基本信息（第一步）
- **必填信息**
  - 产品名称（2-50字符）
  - 产品类型（下拉选择）
  - 产品描述（最多500字）
- **选填信息**
  - 产品图片（支持jpg/png，大小不超过2MB）
  - 产品标签（最多5个）
  - 产品状态（默认为"草稿"）

#### 2.1.2 接入信息（第二步）
- **必填信息**
  - 产品ID（只允许英文字母和下划线，必须唯一）
  - Webhook URL（用于接收通知）
  - 回调验证密钥
- **选填信息**
  - API版本选择
  - 通知配置
  - 错误重试策略

#### 2.1.3 法务信息（第三步）
- **必填信息**
  - 营业执照（PDF格式）
  - 资质证明文件
- **选填信息**
  - 补充协议
  - 其他证明材料

#### 2.1.4 表单控制
- 支持表单数据临时保存
- 支持步骤间自由切换
- 提供表单验证
- 提供提交确认机制

### 2.2 产品列表
#### 2.2.1 列表展示
- **列表字段**
  - 产品ID
  - 产品名称
  - 产品类型
  - 创建时间
  - 更新时间
  - 状态
  - 操作按钮

#### 2.2.2 搜索功能
- **搜索条件**
  - 产品名称（支持模糊搜索）
  - 产品ID（精确匹配）
  - 产品类型（多选）
  - 创建时间范围
  - 状态筛选

#### 2.2.3 分页功能
- 默认每页显示10条记录
- 支持自定义每页显示数量（10/20/50/100）
- 显示总记录数
- 支持页码快速跳转

#### 2.2.4 操功能
- 查看详情
- 编辑产品
- 停用/启用产品
- 删除产品（需二次确认）
- 批量操作支持

## 3. 技术方案
### 3.1 数据模型设计

#### 3.1.1 SQLite 数据模型
```prisma
model Product {
  id            String      @id // 用户自定义的产品ID
  name          String      // 产品名称
  description   String?     // 产品描述
  type          String      // 产品类型
  status        String      @default("draft") // 产品状态
  imageUrl      String?     // 产品图片URL
  tags          String      // 产品标签，用逗号分隔存储
  
  // 接入信息
  webhookUrl    String      // Webhook URL
  secretKey     String      // 回调验证密钥
  apiVersion    String?     // API版本
  notifyConfig  String?     // 通知配置，存储 JSON 字符串
  retryStrategy String?     // 重试策略，存储 JSON 字符串
  
  // 法务信息
  licenseUrl    String?     // 营业执照文件URL
  qualificationUrls String  // 资质证明文件URLs，用逗号分隔存储
  
  // 元数据
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  createdBy     String      // 创建者ID
  updatedBy     String      // 更新者ID
}
```

#### 3.1.2 数据转换
由于 SQLite 不支持数组和 JSON 类型，需要进行数据转换：
- 数组类型（tags, qualificationUrls）使用逗号分隔的字符串存储
- JSON 类型（notifyConfig, retryStrategy）序列化为字符串存储

### 3.2 产品 ID 生成规则
```typescript
function generateProductId(): string {
  // 使用英文单词组合生成ID
  const prefix = ['app', 'api', 'sdk', 'service', 'tool'];
  const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
  const suffix = generateRandomString(8).toLowerCase();
  return `${randomPrefix}_${suffix}`;
}
```

### 3.3 文件上传实现
- 存储位置：`public/uploads` 目录
- 文件命名：使用 UUID 生成唯一文件名
- 支持类型：
  - 图片：jpg, png
  - 文档：pdf
- 大小限制：5MB
- 文件预览：
  - 图片：直接预览
  - 文档：显示文档图标

### 3.4 前端组件结构
```
src/components/products/
├── ProductForm/
│   ├── index.tsx          // 主表单组件
│   ├── BasicInfoStep.tsx  // 基本信息步骤
│   ├── IntegrationStep.tsx// 接入信息步骤
│   ├── LegalInfoStep.tsx  // 法务信息步骤
│   └── StepProgress.tsx   // 步骤进度条
├── ProductList/
│   ├── index.tsx          // 产品列表主组件
│   ├── SearchForm.tsx     // 搜索表单
│   └── ProductTable.tsx   // 产品表格
├── ProductDetail/
│   └── index.tsx          // 产品详情组件
└── FileUpload.tsx         // 文件上传组件
```

### 3.5 API 实现
#### 3.5.1 产品管理接口
```typescript
// 创建产品
POST /api/products
Request: ProductFormData
Response: Product

// 更新产品
PUT /api/products/:id
Request: ProductFormData
Response: Product

// 获取产品详情
GET /api/products/:id
Response: Product

// 获取产品列表
GET /api/products
Query: {
  page?: number;
  pageSize?: number;
  name?: string;
  type?: string[];
  status?: string;
  startDate?: string;
  endDate?: string;
}
Response: {
  data: Product[];
  pagination: {
    total: number;
    current: number;
    pageSize: number;
  }
}
```

#### 3.5.2 文件上传接口
```typescript
POST /api/upload
Request: FormData {
  file: File;
  type: 'image' | 'document';
  oldPath?: string;
}
Response: {
  success: boolean;
  path?: string;
  error?: string;
}
```

### 3.6 数据验证
使用 Zod 进行数据验证：
```typescript
const productSchema = z.object({
  name: z.string()
    .min(2, '产品名称至少2个字符')
    .max(50, '产品名称最多50个字符'),
  type: z.enum(['SAAS', 'API', 'SDK', 'OTHER']),
  id: z.string()
    .regex(/^[a-zA-Z_]+$/, '产品ID只能包含英文字母和下划线'),
  webhookUrl: z.string().url('请输入有效的Webhook URL'),
  secretKey: z.string().min(16, '密钥至少16个字符'),
  // ... 其他字段验证
});
```

### 3.7 错误处理
```typescript
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
  PRODUCT_ID_EXISTS: '产品ID已存在',
  INVALID_PRODUCT_ID: '无效的产品ID格式',
  FILE_TOO_LARGE: '文件大小超过限制',
  INVALID_FILE_TYPE: '不支持的文件类型',
};
```

### 3.8 测试数据生成
使用 Faker.js 生成测试数据：
```typescript
const product = {
  id: generateUniqueProductId(),
  name: faker.company.name(),
  description: faker.company.catchPhrase(),
  type: faker.helpers.arrayElement(['SAAS', 'API', 'SDK', 'OTHER']),
  status: faker.helpers.arrayElement(['draft', 'active', 'inactive']),
  // ... 其他字段
};
```

### 3.9 分页实现
```typescript
// 分页组件
interface PaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number, pageSize: number) => void;
}

// 分页组件实现
export function Pagination({
  total,
  pageSize,
  current,
  onChange
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <div>共 {total} 条记录</div>
        <div>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onChange(1, Number(value))}
          >
            <SelectItem value="10">10条/页</SelectItem>
            <SelectItem value="20">20条/页</SelectItem>
            <SelectItem value="50">50条/页</SelectItem>
            <SelectItem value="100">100条/页</SelectItem>
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => onChange(current - 1, pageSize)}
          disabled={current <= 1}
        >
          上一页
        </Button>
        <div>第 {current} 页，共 {totalPages} 页</div>
        <Button
          onClick={() => onChange(current + 1, pageSize)}
          disabled={current >= totalPages}
        >
          下一页
        </Button>
      </div>
    </div>
  );
}
```

### 3.10 状态管理
#### 3.10.1 加载状态
```typescript
// 列表加载状态
const [isLoading, setIsLoading] = useState(false);

// 加载中展示
{isLoading ? (
  <div className="h-[400px] flex items-center justify-center">
    <div className="text-muted-foreground">加载中...</div>
  </div>
) : null}

// 空状态展示
{!isLoading && products.length === 0 ? (
  <div className="h-[400px] flex items-center justify-center">
    <div className="text-muted-foreground">暂无数据</div>
  </div>
) : null}
```

#### 3.10.2 表单状态
```typescript
// 表单状态管理
const form = useForm<Product>({
  resolver: zodResolver(productSchema),
  defaultValues: product || defaultProductFormValues,
});

// 步骤状态
const [step, setStep] = useState(1);
const [isSubmitting, setIsSubmitting] = useState(false);

// 表单提交状态处理
const onSubmit = async (isDraft: boolean) => {
  try {
    setIsSubmitting(true);
    // ... 提交逻辑
  } catch (error) {
    // ... 错误处理
  } finally {
    setIsSubmitting(false);
  }
};
```

### 3.11 URL 参数管理
```typescript
// 搜索参数处理
const searchParams = useSearchParams();
const currentParams = {
  page: Number(searchParams.get('page')) || 1,
  pageSize: Number(searchParams.get('pageSize')) || 10,
  name: searchParams.get('name') || '',
  type: searchParams.getAll('type') as ProductType[],
  status: searchParams.get('status') as ProductStatus || undefined,
};

// 更新 URL 参数
const handleSearch = (values: typeof currentParams) => {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v));
    } else if (value) {
      params.set(key, String(value));
    }
  });
  router.push(`/dashboard/products?${params.toString()}`);
};
```

### 3.12 性能优化
#### 3.12.1 数据缓存
- 使用 URLSearchParams 作为依赖项的序列化值
- 避免不必要的重新渲染
```typescript
const searchParamsString = JSON.stringify(params);

useEffect(() => {
  fetchProducts();
}, [searchParamsString]); // 只在参数真正变化时重新获取数据
```

#### 3.12.2 加载优化
- 使用骨架屏或加载状态
- 分页数据懒加载
- 表单分步加载

### 3.13 安全考虑
#### 3.13.1 URL 编码
```typescript
// 编码产品 ID
<Link href={`/products/${encodeURIComponent(product.id)}`}>

// 解码产品 ID
const decodedId = decodeURIComponent(params.id);
```

#### 3.13.2 表单验证
- 客户端验证：使用 Zod schema
- 服务端验证：API 接口验证
- 文件上传验证：类型和大小限制

### 3.14 错误处理
#### 3.14.1 API 错误
```typescript
try {
  const res = await fetch('/api/products');
  if (!res.ok) {
    throw new Error('请求失败');
  }
  const data = await res.json();
} catch (error) {
  toast({
    title: '操作失败',
    description: error.message,
    variant: 'destructive',
  });
}
```

#### 3.14.2 表单错误
```typescript
const form = useForm({
  resolver: zodResolver(productSchema),
});

// 显示错误信息
<FormMessage />
```

### 3.15 测试策略
#### 3.15.1 单元测试
- 验证规则测试
- 工具函数测试
- 组件渲染测试

#### 3.15.2 集成测试
- API 接口测试
- 表单提交流程测试
- 文件上传测试

#### 3.15.3 E2E 测试
- 产品创建流程
- 产品编辑流程
- 产品列表操作
