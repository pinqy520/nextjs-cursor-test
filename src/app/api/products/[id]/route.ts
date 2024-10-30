import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { productUtils } from "@/lib/productUtils";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Parse JSON strings back to arrays
    const formattedProduct = {
      ...product,
      tags: productUtils.parseTags(product.tags),
      supplementalDocs: productUtils.parseSupplementalDocs(product.supplementalDocs),
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: data.name as string,
        type: data.type as string,
        description: data.description as string,
        webhookUrl: data.webhookUrl as string,
        callbackKey: data.callbackKey as string,
        apiVersion: data.apiVersion as string,
        status: data.status as string,
        tags: data.tags as string, // Already JSON stringified
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
} 