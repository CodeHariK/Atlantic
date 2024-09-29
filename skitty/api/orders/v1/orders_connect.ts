// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file orders/v1/orders.proto (package orders.v11, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { PlaceOrderRequest, PlaceOrderResponse } from "./orders_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service orders.v11.OrdersService
 */
export const OrdersService = {
  typeName: "orders.v11.OrdersService",
  methods: {
    /**
     * @generated from rpc orders.v11.OrdersService.PlaceOrder
     */
    placeOrder: {
      name: "PlaceOrder",
      I: PlaceOrderRequest,
      O: PlaceOrderResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

