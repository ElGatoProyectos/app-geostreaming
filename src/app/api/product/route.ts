import { ProductController } from "@/service/products";
import { ProductModel } from "@/models/mysql/product-model";
import { NextRequest, NextResponse } from "next/server";

const productController = new ProductController({ productModel: ProductModel });

export async function GET() {
  try {
    const products = await productController.getAll();
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to get Products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newProduct = await productController.create(req);
    return NextResponse.json({ product: newProduct });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to Create Product" },
      { status: 500 }
    );
  }
}
