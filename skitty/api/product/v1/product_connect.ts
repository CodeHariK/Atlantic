// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file product/v1/product.proto (package product.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateProductAndDescriptionRequest, CreateProductAndDescriptionResponse } from "./product_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service product.v1.ProductService
 */
export const ProductService = {
  typeName: "product.v1.ProductService",
  methods: {
    /**
     * @generated from rpc product.v1.ProductService.CreateProductAndDescription
     */
    createProductAndDescription: {
      name: "CreateProductAndDescription",
      I: CreateProductAndDescriptionRequest,
      O: CreateProductAndDescriptionResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

