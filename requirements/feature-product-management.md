# Product Management Function Design Document

## 1. Requirements Overview
### 1.1 Function Overview
The product management module primarily consists of two core functions: product access and product list management. This module aims to provide comprehensive product lifecycle management capabilities.

### 1.2 Function List
- Product Access (Step-by-Step Form)
- Product List Management
- Product Search
- Product Status Management

## 2. Function Requirements
### 2.1 Product Access
#### 2.1.1 Basic Information (Step 1)
- **Mandatory Information**
  - Product Name (2-50 characters)
  - Product Type (Dropdown Selection)
  - Product Description (Up to 500 words)
- **Optional Information**
  - Product Image (Supports jpg/png, up to 2MB)
  - Product Tags (Up to 5)
  - Product Status (Default: "Draft")

#### 2.1.2 Access Information (Step 2)
- **Mandatory Information**
  - Product ID (Only allows English letters and underscores, must be unique)
  - Webhook URL (For receiving notifications)
  - Callback Verification Key
- **Optional Information**
  - API Version Selection
  - Notification Configuration
  - Error Retry Strategy

#### 2.1.3 Legal Information (Step 3)
- **Mandatory Information**
  - Business License (PDF format)
  - Qualification Certificate
- **Optional Information**
  - Supplemental Agreement
  - Other Supporting Documents

#### 2.1.4 Form Control
- Supports temporary saving of form data
- Supports free switching between steps
- Provides form validation
- Provides submission confirmation mechanism

### 2.2 Product List
#### 2.2.1 List Display
- **List Fields**
  - Product ID
  - Product Name
  - Product Type
  - Creation Time
  - Update Time
  - Status
  - Operation Buttons

#### 2.2.2 Search Function
- **Search Conditions**
  - Product Name (Supports fuzzy search)
  - Product ID (Exact match)
  - Product Type (Multiple selection)
  - Creation Time Range
  - Status Filter

#### 2.2.3 Pagination Function
- Default displays 10 records per page
- Supports customizing the number of records per page (10/20/50/100)
- Displays the total number of records
- Supports quick page jumping

#### 2.2.4 Operation Function
- View Details
- Edit Product
- Disable/Enable Product

## 3. Technical Implementation Plan

### 3.1 Project Structure
```
src/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── [id]/
│   │       │   ├── route.ts
│   │       │   └── status/
│   │       │       └── route.ts
│   │       └── route.ts
│   └── products/
│       ├── [id]/
│       │   ├── edit/
│       │   │   └── page.tsx
│       │   └── page.tsx
│       ├── new/
│       │   └── page.tsx
│       └── page.tsx
├── components/
│   └── products/
│       ├── ProductForm/
│       │   ├── AccessInfo.tsx
│       │   ├── BasicInfo.tsx
│       │   ├── FormNavigation.tsx
│       │   ├── LegalInfo.tsx
│       │   └── ProductForm.tsx
│       └── ProductList/
│           ├── Pagination.tsx
│           ├── ProductTable.tsx
│           └── SearchFilters.tsx
├── lib/
│   ├── productUtils.ts
│   └── validations/
│       └── product.ts
└── types/
    └── product.ts
```

### 3.2 Component Implementation

#### 3.2.1 Form Components
- **ProductForm**: Main form container with step management
- **BasicInfo**: Product basic information form (Step 1)
- **AccessInfo**: Product access settings form (Step 2)
- **LegalInfo**: Legal document upload form (Step 3)
- **FormNavigation**: Step navigation controls

#### 3.2.2 List Components
- **ProductTable**: Product list display with inline status management
- **SearchFilters**: Advanced search and filtering options
- **Pagination**: Page size and navigation controls

### 3.3 State Management

#### 3.3.1 Form State
```typescript
interface ProductFormState {
  step: number;
  data: {
    basic: {
      name: string;
      type: ProductType;
      description: string;
      image?: File | null;
      tags: string[];
      status: ProductStatus;
    };
    access: {
      productId: string;
      webhookUrl: string;
      callbackKey: string;
      apiVersion?: string;
    };
    legal: {
      businessLicense: File | null;
      qualificationCert: File | null;
      supplementalDocs: File[];
    };
  };
}
```

### 3.4 API Implementation

#### 3.4.1 Endpoints
```typescript
// Create Product
POST /api/products
Content-Type: multipart/form-data

// Update Product
PUT /api/products/:id
Content-Type: multipart/form-data

// Get Product
GET /api/products/:id

// List Products
GET /api/products?page=1&limit=10&search=keyword&type=PHYSICAL&status=ACTIVE

// Update Status
PATCH /api/products/:id/status
Content-Type: application/json
```

#### 3.4.2 Response Format
```typescript
// Single Product Response
{
  id: string;
  productId: string;
  name: string;
  type: ProductType;
  description: string;
  imageUrl?: string;
  tags: string[];
  status: ProductStatus;
  webhookUrl: string;
  callbackKey: string;
  apiVersion?: string;
  businessLicense: string;
  qualificationCert: string;
  supplementalDocs: string[];
  createdAt: Date;
  updatedAt: Date;
}

// List Response
{
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  }
}
```

### 3.5 Validation Implementation

#### 3.5.1 Zod Schema
```typescript
const productValidationSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .transform(val => val.trim()),
  
  productId: z.string()
    .regex(/^[A-Za-z_]+$/, "Only letters and underscores allowed")
    .min(3, "Product ID must be at least 3 characters")
    .max(30, "Product ID must be less than 30 characters"),
  
  type: z.enum([
    ProductTypes.PHYSICAL,
    ProductTypes.DIGITAL,
    ProductTypes.SERVICE
  ]),
  
  description: z.string()
    .max(500, "Description must be less than 500 words"),
  
  webhookUrl: z.string()
    .url("Must be a valid URL"),
  
  callbackKey: z.string()
    .min(1, "Callback key is required"),
  
  apiVersion: z.string().optional(),
  
  tags: z.array(z.string())
    .max(5, "Maximum 5 tags allowed")
    .optional()
    .default([]),
  
  status: z.enum([
    ProductStatuses.DRAFT,
    ProductStatuses.ACTIVE,
    ProductStatuses.DISABLED
  ]).default(ProductStatuses.DRAFT)
});
```

### 3.6 File Handling

#### 3.6.1 Supported File Types
- Images: jpg, png (max 2MB)
- Documents: pdf (max 5MB)

#### 3.6.2 Storage Strategy
Currently using placeholder URLs for development. In production:
- Files will be stored in cloud storage (e.g., S3)
- URLs will be stored in the database
- File validation and virus scanning before storage
- Automatic cleanup of unused files

### 3.7 Testing Data

#### 3.7.1 Seed Script
```typescript
const dummyProducts = [
  {
    productId: "smart_watch_v1",
    name: "Smart Watch Pro",
    type: ProductTypes.PHYSICAL,
    description: "Advanced smartwatch with health monitoring features",
    tags: ["wearable", "tech", "health"],
    status: ProductStatuses.ACTIVE,
    // ... other fields
  },
  // ... more dummy products
];
```

### 3.8 UI Components Used
- Shadcn UI components
- Custom form components
- Responsive layout components
- Loading states and error handling
- Toast notifications (to be implemented)

### 3.9 Future Enhancements
1. Implement file upload to cloud storage
2. Add batch operations for products
3. Add product version control
4. Implement advanced search with Elasticsearch
5. Add product analytics and metrics
6. Implement real-time status updates
7. Add product category management
8. Implement product approval workflow