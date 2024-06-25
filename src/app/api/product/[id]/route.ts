import { ProductModel } from "@/models/mysql/product-model";
import { ProductController } from "@/service/products";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth-options";

const productController = new ProductController({ productModel: ProductModel });

export async function GET(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const product = await productController.getById({ product_id: id });
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to get product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "forbidden" }, { status: 500 });
    }
    const product = await productController.update({ req, params });
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update products" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "forbidden" }, { status: 500 });
    }
    await productController.delete({ params });
    return NextResponse.json({ message: "Delete product" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to delete product" },
      { status: 404 }
    );
  }
}
