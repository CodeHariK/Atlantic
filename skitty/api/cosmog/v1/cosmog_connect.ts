// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file cosmog/v1/cosmog.proto (package cosmog.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateSearchKeyRequest, CreateSearchKeyResponse, DeleteProductRequest, DeleteProductResponse, GetProductRequest, GetTaskRequest, GetTaskResponse, Product, UpdateProductRequest, UpdateProductResponse } from "./cosmog_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service cosmog.v1.CosmogService
 */
export const CosmogService = {
  typeName: "cosmog.v1.CosmogService",
  methods: {
    /**
     * @generated from rpc cosmog.v1.CosmogService.CreateSearchKey
     */
    createSearchKey: {
      name: "CreateSearchKey",
      I: CreateSearchKeyRequest,
      O: CreateSearchKeyResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc cosmog.v1.CosmogService.GetProduct
     */
    getProduct: {
      name: "GetProduct",
      I: GetProductRequest,
      O: Product,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc cosmog.v1.CosmogService.DeleteProduct
     */
    deleteProduct: {
      name: "DeleteProduct",
      I: DeleteProductRequest,
      O: DeleteProductResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc cosmog.v1.CosmogService.UpdateProduct
     */
    updateProduct: {
      name: "UpdateProduct",
      I: UpdateProductRequest,
      O: UpdateProductResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc cosmog.v1.CosmogService.GetTask
     */
    getTask: {
      name: "GetTask",
      I: GetTaskRequest,
      O: GetTaskResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

