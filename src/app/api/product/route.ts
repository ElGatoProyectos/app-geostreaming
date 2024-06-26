import { productFormSchema } from "./../../schemas/productFormSchema";
import { ProductController } from "@/service/products";
import { ProductModel } from "@/models/mysql/product-model";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";

const productController = new ProductController({ productModel: ProductModel });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as
    | "IMMEDIATE_DELIVERY"
    | "UPON_REQUEST"
    | null;

  try {
    let products;
    if (status) {
      products = await productController.getAllByStatus(status);
    } else {
      products = await productController.getAll();
    }
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "forbidden" }, { status: 500 });
    }

    const newProduct = await productController.create(req);
    return NextResponse.json({ product: newProduct });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to Create Product" },
      { status: 500 }
    );
  }
}
