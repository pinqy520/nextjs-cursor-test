# NextJS Cursor Simple

This is a [Next.js](https://nextjs.org) project using Next.js 14, TypeScript, and Tailwind CSS, featuring a modern dashboard with authentication and product management.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **Database:** SQLite
- **ORM:** Prisma
- **Authentication:** Custom JWT-based auth
- **Form Validation:** Zod
- **Package Manager:** npm

## Features

- 🔐 Authentication with email and password
- 📊 Modern dashboard interface
- 🎨 Fully responsive design
- 🔍 Search functionality
- 📱 Mobile-friendly navigation
- 🎯 Role-based access control
- 💾 SQLite database integration
- 📦 Product Management System
  - Multi-step form for product creation
  - File upload support
  - Status management
  - Advanced search and filtering
  - Pagination
  - Responsive data tables

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── products/
│   │       ├── [id]/
│   │       │   ├── route.ts
│   │       │   └── status/
│   │       └── route.ts
│   ├── products/
│   │   ├── [id]/
│   │   │   ├── edit/
│   │   │   └── page.tsx
│   │   ├── new/
│   │   └── page.tsx
│   ├── dashboard/
│   ├── login/
│   └── register/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── products/
│   │   ├── ProductForm/
│   │   │   ├── AccessInfo.tsx
│   │   │   ├── BasicInfo.tsx
│   │   │   ├── FormNavigation.tsx
│   │   │   ├── LegalInfo.tsx
│   │   │   └── ProductForm.tsx
│   │   └── ProductList/
│   │       ├── Pagination.tsx
│   │       ├── ProductTable.tsx
│   │       └── SearchFilters.tsx
│   ├── navigation/
│   │   └── NavBar.tsx
│   └── ui/
└── lib/
    ├── productUtils.ts
    └── validations/
        └── product.ts
```

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Seed the database with sample data:
```bash
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Product Management Features

### Multi-step Form
- Step 1: Basic Information
  - Product name, type, description
  - Optional image upload
  - Tags and status
- Step 2: Access Information
  - Product ID (unique identifier)
  - Webhook URL configuration
  - API version settings
- Step 3: Legal Documents
  - Business license upload
  - Qualification certificate
  - Supplemental documents

### List Management
- Responsive data table
- Status updates
- Search and filtering
- Pagination controls
- Quick actions (view, edit)

### File Handling
- Support for PDF documents
- Image upload support
- File size validation
- Type validation

## Development

The project uses:
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font) font
- Tailwind CSS for styling
- TypeScript for type safety
- Prisma for database management
- Shadcn UI for components
- Zod for form validation

## Database Schema

The database includes the following models:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id            String   @id @default(cuid())
  productId     String   @unique
  name          String
  type          String
  description   String
  imageUrl      String?
  tags          String
  status        String   @default("DRAFT")
  webhookUrl    String
  callbackKey   String
  apiVersion    String?
  businessLicense    String
  qualificationCert  String
  supplementalDocs   String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([productId])
  @@index([type])
  @@index([status])
  @@index([createdAt])
}
```

## API Routes

### Authentication
- `/api/auth/login` - Handle user login
- `/api/auth/register` - Handle user registration

### Product Management
- `/api/products` - Create and list products
- `/api/products/:id` - Get, update, and delete products
- `/api/products/:id/status` - Update product status

## Future Enhancements

1. Cloud storage integration for file uploads
2. Batch operations for products
3. Product version control
4. Advanced search with Elasticsearch
5. Product analytics and metrics
6. Real-time status updates
7. Product category management
8. Product approval workflow

