// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file cart/v1/cart.proto (package cart.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message cart.v1.Cart
 */
export class Cart extends Message<Cart> {
  /**
   * @generated from field: google.protobuf.Timestamp updated_at = 4;
   */
  updatedAt?: Timestamp;

  /**
   * @generated from field: repeated cart.v1.CartItem items = 5;
   */
  items: CartItem[] = [];

  constructor(data?: PartialMessage<Cart>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cart.v1.Cart";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 4, name: "updated_at", kind: "message", T: Timestamp },
    { no: 5, name: "items", kind: "message", T: CartItem, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Cart {
    return new Cart().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Cart {
    return new Cart().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Cart {
    return new Cart().fromJsonString(jsonString, options);
  }

  static equals(a: Cart | PlainMessage<Cart> | undefined, b: Cart | PlainMessage<Cart> | undefined): boolean {
    return proto3.util.equals(Cart, a, b);
  }
}

/**
 * @generated from message cart.v1.CartItem
 */
export class CartItem extends Message<CartItem> {
  /**
   * @generated from field: string product_id = 1;
   */
  productId = "";

  /**
   * @generated from field: string name = 2;
   */
  name = "";

  /**
   * @generated from field: int32 quantity = 3;
   */
  quantity = 0;

  constructor(data?: PartialMessage<CartItem>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cart.v1.CartItem";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "product_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "quantity", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CartItem {
    return new CartItem().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CartItem {
    return new CartItem().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CartItem {
    return new CartItem().fromJsonString(jsonString, options);
  }

  static equals(a: CartItem | PlainMessage<CartItem> | undefined, b: CartItem | PlainMessage<CartItem> | undefined): boolean {
    return proto3.util.equals(CartItem, a, b);
  }
}

/**
 * @generated from message cart.v1.CreateCartRequest
 */
export class CreateCartRequest extends Message<CreateCartRequest> {
  constructor(data?: PartialMessage<CreateCartRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cart.v1.CreateCartRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateCartRequest {
    return new CreateCartRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateCartRequest {
    return new CreateCartRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateCartRequest {
    return new CreateCartRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateCartRequest | PlainMessage<CreateCartRequest> | undefined, b: CreateCartRequest | PlainMessage<CreateCartRequest> | undefined): boolean {
    return proto3.util.equals(CreateCartRequest, a, b);
  }
}

/**
 * @generated from message cart.v1.GetCartRequest
 */
export class GetCartRequest extends Message<GetCartRequest> {
  constructor(data?: PartialMessage<GetCartRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cart.v1.GetCartRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetCartRequest {
    return new GetCartRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetCartRequest {
    return new GetCartRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetCartRequest {
    return new GetCartRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetCartRequest | PlainMessage<GetCartRequest> | undefined, b: GetCartRequest | PlainMessage<GetCartRequest> | undefined): boolean {
    return proto3.util.equals(GetCartRequest, a, b);
  }
}

/**
 * @generated from message cart.v1.CheckoutCartRequest
 */
export class CheckoutCartRequest extends Message<CheckoutCartRequest> {
  constructor(data?: PartialMessage<CheckoutCartRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cart.v1.CheckoutCartRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CheckoutCartRequest {
    return new CheckoutCartRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CheckoutCartRequest {
    return new CheckoutCartRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CheckoutCartRequest {
    return new CheckoutCartRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CheckoutCartRequest | PlainMessage<CheckoutCartRequest> | undefined, b: CheckoutCartRequest | PlainMessage<CheckoutCartRequest> | undefined): boolean {
    return proto3.util.equals(CheckoutCartRequest, a, b);
  }
}

/**
 * @generated from message cart.v1.CheckoutCartResponse
 */
export class CheckoutCartResponse extends Message<CheckoutCartResponse> {
  constructor(data?: PartialMessage<CheckoutCartResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cart.v1.CheckoutCartResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CheckoutCartResponse {
    return new CheckoutCartResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CheckoutCartResponse {
    return new CheckoutCartResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CheckoutCartResponse {
    return new CheckoutCartResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CheckoutCartResponse | PlainMessage<CheckoutCartResponse> | undefined, b: CheckoutCartResponse | PlainMessage<CheckoutCartResponse> | undefined): boolean {
    return proto3.util.equals(CheckoutCartResponse, a, b);
  }
}

