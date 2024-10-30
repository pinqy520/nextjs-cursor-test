import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ProductStatuses } from "@/types/product";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();

    // Validate status
    if (!Object.values(ProductStatuses).includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product status:", error);
    return NextResponse.json(
      { error: "Error updating product status" },
      { status: 500 }
    );
  }
} 