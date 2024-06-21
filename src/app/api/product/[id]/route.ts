import { ProductModel } from "@/models/mysql/product-model";
import { ProductController } from "@/service/products";
import { NextRequest, NextResponse } from "next/server";

const productController = new ProductController({ productModel: ProductModel });

export async function GET(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const products = await productController.getById({ product_id: id });
    return NextResponse.json(products);
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
    const products = await productController.update({ req, params });
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update products" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await productController.delete({ params });
    return NextResponse.json({ message: "Delete product" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to delete product" },
      { status: 404 }
    );
  }
}
