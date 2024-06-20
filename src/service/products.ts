import { validateProduct } from "@/lib/validations/product";
import { ProductInType } from "@/types/product";

import { NextRequest } from "next/server";

export interface ProductModelType {
  // getById: ({ id }: { id: number }) => Promise<any | null>;
  getAll: (platformId?: number) => Promise<any[]>;
  create: ({ platform, accounts, prices }: ProductInType) => Promise<any>;
}

export class ProductController {
  private productModel: ProductModelType;

  constructor({ productModel }: { productModel: ProductModelType }) {
    this.productModel = productModel;
  }

  // getById = async (req: NextRequest): Promise<NextApiResponse> => {
  //   const { id } = req.query;
  //   try {
  //     const product = await this.productModel.getById({
  //       id: parseInt(id as string, 10),
  //     });
  //     if (product) {
  //       return NextResponse.json(product);
  //     } else {
  //       return NextResponse.json(
  //         { message: "Product not found" },
  //         { status: 404 }
  //       );
  //     }
  //   } catch (error: any) {
  //     return NextResponse.json({ error: error.message }, { status: 500 });
  //   }
  // };

  getAll = async (req: NextRequest) => {
    const query = req.body;
    try {
      let platformId;
      if (query) {
        platformId = Number(query);
      }

      const products = await this.productModel.getAll();

      console.log("products", products);
      return products;
    } catch (error: any) {
      return null;
    }
  };

  create = async (req: NextRequest): Promise<void> => {
    const productInfo = await req.json();
    const { isValid, productValidated } = validateProduct(productInfo);

    if (!isValid) {
      throw new Error("Validation failed");
    }

    const newProduct = await this.productModel.create(productValidated);
    console.log("newProduct", newProduct);
    // if (!result.success) {
    //   throw new Error("Validation failed");
    // }
    // try {
    //   const newProduct = await this.productModel.create({
    //     productInfo: result.data,
    //   });

    //   return newProduct;
    // } catch (error: any) {
    //   return;
    // }
  };
}
