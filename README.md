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

- 用户认证
  - 登录/注册功能
  - 基于 Cookie 的会话管理
  - 路由保护
  - 登出功能
- 用户管理
  - 用户信息显示
  - 密码加密存储
- UI/UX
  - 响应式设计
  - 表单验证
  - 加载状态
  - 错误处理

## 项目结构

```
src/
├── app/                    # Next.js 应用主目录
│   ├── api/               # API 路由
│   │   └── auth/         # 认证相关 API
│   ├── auth/             # 认证相关页面
│   │   ├── login/       # 登录页面
│   │   └── register/    # 注册页面
│   └── dashboard/        # 仪表盘页面
├── components/            # React 组件
│   ├── ui/              # UI 基础组件
│   └── user-info.tsx    # 用户信息组件
└── lib/                  # 工具库
    ├── services/        # 业务服务
    ├── validations/    # 数据验证
    └── prisma.ts       # Prisma 客户端

prisma/
└── schema.prisma        # 数据库 Schema
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

3. 运行开发服务器：

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 环境要求

- Node.js 18+
- npm 或 yarn 或 pnpm

## 样式

本项目使用：
- Tailwind CSS 进行样式设计
- Shadcn UI 作为组件库
- 配置文件：
  - `tailwind.config.ts` - Tailwind CSS 配置
  - `postcss.config.mjs` - PostCSS 配置

## API 路由

- POST `/api/auth/login` - 用户登录
- POST `/api/auth/register` - 用户注册
- POST `/api/auth/logout` - 用户登出
- GET `/api/auth/me` - 获取当前用户信息

## 数据库

使用 SQLite 作为数据库，通过 Prisma ORM 进行管理。主要模型：

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

## 了解更多

要了解更多关于使用的技术，请查看：

- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Shadcn UI 文档](https://ui.shadcn.com)

