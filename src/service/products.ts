import {
  validateEditedProduct,
  validateProduct,
} from "@/lib/validations/product";
import {
  ProductInType,
  ProductOutType,
  ProductUpdateInType,
} from "@/types/product";

import { NextRequest } from "next/server";

interface ProductModelType {
  getById: ({ productId }: { productId: number }) => Promise<any | null>;
  getAll: () => Promise<any[]>;
  create: ({ platform, accounts }: ProductInType) => Promise<ProductOutType>;
  delete: ({ product_id }: { product_id: number }) => Promise<any | null>;
  update: ({
    product_id,
    product_info,
  }: {
    product_id: number;
    product_info: ProductUpdateInType;
  }) => Promise<any>;
  getAllByStatus: (
    productStatus: "IMMEDIATE_DELIVERY" | "UPON_REQUEST"
  ) => Promise<any[]>;
}

export class ProductController {
  private productModel: ProductModelType;

  constructor({ productModel }: { productModel: ProductModelType }) {
    this.productModel = productModel;
  }

  getById = async ({ product_id }: { product_id: string }) => {
    try {
      const productId = Number(product_id);
      const exactProduct = await this.productModel.getById({
        productId,
      });

      return exactProduct;
    } catch (e) {
      return console.error("Product not found", e);
    }
  };

  getAll = async () => {
    try {
      const products = await this.productModel.getAll();

      return products;
    } catch (e) {
      return console.error("Products not found", e);
    }
  };

  getAllByStatus = async (
    productStatus: "IMMEDIATE_DELIVERY" | "UPON_REQUEST"
  ) => {
    try {
      const products = await this.productModel.getAllByStatus(productStatus);
      return products;
    } catch (e) {
      throw new Error(`Products with status ${productStatus} not found}`);
    }
  };

  create = async (req: NextRequest) => {
    const productInfo = await req.json();

    const productValidated = validateProduct(productInfo);

    try {
      const newProduct = await this.productModel.create(productValidated);
      return newProduct;
    } catch (e) {
      return console.error("Product not created", e);
    }
  };

  delete = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const result = await this.productModel.delete({
      product_id: Number(id),
    });

    return result === false ? false : true;
  };

  update = async ({
    req,
    params,
  }: {
    params: { id: string };
    req: NextRequest;
  }) => {
    const productInfo = await req.json();
    const { id } = params;

    const { isValid, productValidated } = validateEditedProduct(productInfo);

    if (!isValid) throw new Error("Product not update");

    try {
      const productUpdated = await this.productModel.update({
        product_id: Number(id),
        product_info: productValidated,
      });

      return productUpdated;
    } catch (e) {
      throw new Error("Product not update");
    }
  };
}
