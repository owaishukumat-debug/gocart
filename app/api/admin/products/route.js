// app/api/admin/products/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, mrp, price, images, category, inStock } = body;

    // ✅ Required fields check
    if (!name || !mrp || !price) {
      return NextResponse.json(
        { error: "Name, MRP and Price are required" },
        { status: 400 }
      );
    }

    // ✅ Prisma create
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || "",
        mrp: parseFloat(mrp),
        price: parseFloat(price),
        images: images && Array.isArray(images) ? images : [], // ensure array
        category: category || "uncategorized",
        inStock: inStock ?? true,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
