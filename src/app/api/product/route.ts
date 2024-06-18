import { ProductController } from "@/controllers/products";
import { ProductModel } from "@/models/mysql/product-model";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const productController = new ProductController({ productModel: ProductModel });

export async function GET(req: NextApiRequest) {
  const products = await productController.getAll(req);
  try {
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to get Products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextApiRequest) {
  const newProduct = await productController.create(req);

  try {
    return NextResponse.json({ products: newProduct });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to Create Product" },
      { status: 500 }
    );
  }
}
