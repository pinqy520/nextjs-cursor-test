import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { productUtils } from '@/lib/productUtils';
import { productValidationSchema } from '@/lib/validations/product';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    // Validate the data
    const validated = productValidationSchema.parse(data);

    // Handle file uploads and get URLs
    // In a real app, you'd upload these files to storage and get URLs back
    const businessLicenseUrl = "placeholder_url"; // Replace with actual file upload
    const qualificationCertUrl = "placeholder_url"; // Replace with actual file upload
    
    // Create product with all required fields
    const product = await prisma.product.create({
      data: {
        name: validated.name,
        productId: validated.productId,
        type: validated.type,
        description: validated.description,
        webhookUrl: validated.webhookUrl,
        callbackKey: validated.callbackKey,
        apiVersion: validated.apiVersion,
        status: validated.status,
        // Convert arrays to JSON strings for SQLite storage
        tags: JSON.stringify(validated.tags || []),
        supplementalDocs: JSON.stringify([]), // Initialize as empty array
        // Add required fields
        businessLicense: businessLicenseUrl,
        qualificationCert: qualificationCertUrl,
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error creating product' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || undefined;
    const type = searchParams.get('type') || undefined;
    const status = searchParams.get('status') || undefined;

    const products = await prisma.product.findMany({
      where: {
        OR: search ? [
          { name: { contains: search } },
          { productId: { equals: search } }
        ] : undefined,
        type: type || undefined,
        status: status || undefined,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    // Parse JSON strings back to arrays for client
    const formattedProducts = products.map(product => ({
      ...product,
      tags: productUtils.parseTags(product.tags),
      supplementalDocs: productUtils.parseSupplementalDocs(product.supplementalDocs)
    }));

    const total = await prisma.product.count();

    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
} 