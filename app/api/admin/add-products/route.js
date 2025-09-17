import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // apna prisma client yahan import karo

// Add Product
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, mrp, price, images, category, inStock } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and Price are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        mrp,
        price,
        images, // array hai to Prisma schema me [String] hona chahiye
        category,
        inStock,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Get All Products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
