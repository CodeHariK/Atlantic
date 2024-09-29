// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file orders/v1/orders.proto (package orders.v11, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message orders.v11.PlaceOrderRequest
 */
export class PlaceOrderRequest extends Message<PlaceOrderRequest> {
  /**
   * @generated from field: string OrderID = 1;
   */
  OrderID = "";

  /**
   * @generated from field: string CustomerID = 2;
   */
  CustomerID = "";

  constructor(data?: PartialMessage<PlaceOrderRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "orders.v11.PlaceOrderRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "OrderID", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "CustomerID", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PlaceOrderRequest {
    return new PlaceOrderRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PlaceOrderRequest {
    return new PlaceOrderRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PlaceOrderRequest {
    return new PlaceOrderRequest().fromJsonString(jsonString, options);
  }

  static equals(a: PlaceOrderRequest | PlainMessage<PlaceOrderRequest> | undefined, b: PlaceOrderRequest | PlainMessage<PlaceOrderRequest> | undefined): boolean {
    return proto3.util.equals(PlaceOrderRequest, a, b);
  }
}

/**
 * @generated from message orders.v11.PlaceOrderResponse
 */
export class PlaceOrderResponse extends Message<PlaceOrderResponse> {
  /**
   * @generated from field: string OrderID = 1;
   */
  OrderID = "";

  constructor(data?: PartialMessage<PlaceOrderResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "orders.v11.PlaceOrderResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "OrderID", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PlaceOrderResponse {
    return new PlaceOrderResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PlaceOrderResponse {
    return new PlaceOrderResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PlaceOrderResponse {
    return new PlaceOrderResponse().fromJsonString(jsonString, options);
  }

  static equals(a: PlaceOrderResponse | PlainMessage<PlaceOrderResponse> | undefined, b: PlaceOrderResponse | PlainMessage<PlaceOrderResponse> | undefined): boolean {
    return proto3.util.equals(PlaceOrderResponse, a, b);
  }
}

