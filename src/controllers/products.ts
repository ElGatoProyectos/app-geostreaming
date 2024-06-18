import { validateProduct } from "@/lib/validations/product";
import { ProductType } from "@/types/product";
import { NextApiRequest, NextApiResponse } from "next";

export interface ProductModelType {
  // getById: ({ id }: { id: number }) => Promise<any | null>;
  getAll: (platformId?: number) => Promise<any[]>;
  create: ({ productInfo }: { productInfo: ProductType }) => Promise<any>;
}

export class ProductController {
  private productModel: ProductModelType;

  constructor({ productModel }: { productModel: ProductModelType }) {
    this.productModel = productModel;
  }

  // getById = async (req: NextApiRequest): Promise<NextApiResponse> => {
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

  getAll = async (req: NextApiRequest) => {
    try {
      let platformId;
      if (req.query && req.query.platformId) {
        platformId = Number(req.query.platformId);
      }

      const products = await this.productModel.getAll();
      return products;
    } catch (error: any) {
      return null;
    }
  };

  create = async (req: NextApiRequest): Promise<void> => {
    const { productInfo } = req.body;

    const result = validateProduct(productInfo);
    console.log("result", result);
    if (!result.success) {
      throw new Error("Validation failed");
    }
    try {
      const newProduct = await this.productModel.create({
        productInfo: result.data,
      });

      return newProduct;
    } catch (error: any) {
      return;
    }
  };
}
