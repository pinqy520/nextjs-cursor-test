# Next.js Cursor Simple Project

这是一个使用 [Next.js](https://nextjs.org) 框架创建的项目，通过 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) 引导生成。

## 技术栈

- Next.js (^14)
- React (^18)
- TypeScript
- Tailwind CSS (^3.4.1)
- Shadcn UI - UI 组件库
- Prisma - ORM
- SQLite - 数据库
- Zod - 数据验证
- React Hook Form - 表单处理

## 功能特性

### 用户认证
- 登录/注册功能
- 基于 Cookie 的会话管理
- 路由保护
- 登出功能

### 用户管理
- 用户信息显示
- 密码加密存储
- 用户头像
- 用户下拉菜单

### 产品管理
- 产品接入（分步表单）
  - 基本信息：名称、类型、描述、图片
  - 接入信息：产品ID、Webhook、密钥
  - 法务信息：营业执照、资质文件
- 产品列表
  - 分页展示
  - 搜索筛选
  - 状态管理
  - 批量操作
- 文件上传
  - 支持图片和文档
  - 本地存储
  - 大小限制
  - 类型验证

### 仪表盘
- 顶部导航栏
- 统计卡片
- 收入概览图表
- 最近销售列表

## 项目结构

```
src/
├── app/                    # Next.js 应用主目录
│   ├── api/               # API 路由
│   │   ├── auth/         # 认证相关 API
│   │   ├── products/     # 产品管理 API
│   │   └── upload/       # 文件上传 API
│   ├── auth/             # 认证相关页面
│   └── dashboard/        # 仪表盘页面
│       └── products/     # 产品管理页面
├── components/            # React 组件
│   ├── ui/              # UI 基础组件
│   ├── products/        # 产品相关组件
│   │   ├── ProductForm/ # 产品表单组件
│   │   ├── ProductList/ # 产品列表组件
│   │   └── FileUpload  # 文件上传组件
│   └── user-nav.tsx     # 用户导航组件
├── lib/                  # 工具库
│   ├── services/        # 业务服务
│   ├── validations/     # 数据验证
│   └── prisma.ts        # Prisma 客户端
└── types/               # TypeScript 类型定义

prisma/
├── schema.prisma        # 数据库 Schema
└── seed.ts             # 测试数据生成脚本
```

## 开始使用

1. 安装依赖：

```bash
npm install
```

2. 初始化数据库：

```bash
npx prisma generate
npx prisma db push
```

3. 生成测试数据：

```bash
npx tsx prisma/seed.ts
```

4. 运行开发服务器：

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## API 路由

### 认证 API
- POST `/api/auth/login` - 用户登录
- POST `/api/auth/register` - 用户注册
- POST `/api/auth/logout` - 用户登出
- GET `/api/auth/me` - 获取当前用户信息

### 产品管理 API
- GET `/api/products` - 获取产品列表
- POST `/api/products` - 创建产品
- GET `/api/products/:id` - 获取产品详情
- PUT `/api/products/:id` - 更新产品
- POST `/api/upload` - 文件上传

## 数据库模型

### User 模型
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Product 模型
```prisma
model Product {
  id            String      @id
  name          String
  description   String?
  type          String
  status        String      @default("draft")
  imageUrl      String?
  tags          String
  webhookUrl    String
  secretKey     String
  apiVersion    String?
  notifyConfig  String?
  retryStrategy String?
  licenseUrl    String?
  qualificationUrls String
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  createdBy     String
  updatedBy     String
}
```

## 页面路由

- `/auth/login` - 登录页面
- `/auth/register` - 注册页面
- `/dashboard` - 仪表盘主页
- `/dashboard/products` - 产品列表页面
- `/dashboard/products/create` - 创建产品页面
- `/dashboard/products/:id` - 产品详情页面
- `/dashboard/products/:id/edit` - 编辑产品页面

## 了解更多

要了解更多关于使用的技术，请查看：

- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Shadcn UI 文档](https://ui.shadcn.com)
