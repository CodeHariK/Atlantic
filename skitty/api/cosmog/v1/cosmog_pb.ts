// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file cosmog/v1/cosmog.proto (package cosmog.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message cosmog.v1.CreateSearchKeyRequest
 */
export class CreateSearchKeyRequest extends Message<CreateSearchKeyRequest> {
  /**
   * @generated from field: string ID = 1;
   */
  ID = "";

  constructor(data?: PartialMessage<CreateSearchKeyRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cosmog.v1.CreateSearchKeyRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "ID", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateSearchKeyRequest {
    return new CreateSearchKeyRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateSearchKeyRequest {
    return new CreateSearchKeyRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateSearchKeyRequest {
    return new CreateSearchKeyRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateSearchKeyRequest | PlainMessage<CreateSearchKeyRequest> | undefined, b: CreateSearchKeyRequest | PlainMessage<CreateSearchKeyRequest> | undefined): boolean {
    return proto3.util.equals(CreateSearchKeyRequest, a, b);
  }
}

/**
 * @generated from message cosmog.v1.CreateSearchKeyResponse
 */
export class CreateSearchKeyResponse extends Message<CreateSearchKeyResponse> {
  /**
   * @generated from field: string key = 1;
   */
  key = "";

  constructor(data?: PartialMessage<CreateSearchKeyResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cosmog.v1.CreateSearchKeyResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateSearchKeyResponse {
    return new CreateSearchKeyResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateSearchKeyResponse {
    return new CreateSearchKeyResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateSearchKeyResponse {
    return new CreateSearchKeyResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateSearchKeyResponse | PlainMessage<CreateSearchKeyResponse> | undefined, b: CreateSearchKeyResponse | PlainMessage<CreateSearchKeyResponse> | undefined): boolean {
    return proto3.util.equals(CreateSearchKeyResponse, a, b);
  }
}

/**
 * @generated from message cosmog.v1.HelloRequest
 */
export class HelloRequest extends Message<HelloRequest> {
  /**
   * @generated from field: string message = 1;
   */
  message = "";

  constructor(data?: PartialMessage<HelloRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cosmog.v1.HelloRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HelloRequest {
    return new HelloRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HelloRequest {
    return new HelloRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HelloRequest {
    return new HelloRequest().fromJsonString(jsonString, options);
  }

  static equals(a: HelloRequest | PlainMessage<HelloRequest> | undefined, b: HelloRequest | PlainMessage<HelloRequest> | undefined): boolean {
    return proto3.util.equals(HelloRequest, a, b);
  }
}

/**
 * @generated from message cosmog.v1.HelloResponse
 */
export class HelloResponse extends Message<HelloResponse> {
  /**
   * @generated from field: string message = 1;
   */
  message = "";

  constructor(data?: PartialMessage<HelloResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cosmog.v1.HelloResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): HelloResponse {
    return new HelloResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): HelloResponse {
    return new HelloResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): HelloResponse {
    return new HelloResponse().fromJsonString(jsonString, options);
  }

  static equals(a: HelloResponse | PlainMessage<HelloResponse> | undefined, b: HelloResponse | PlainMessage<HelloResponse> | undefined): boolean {
    return proto3.util.equals(HelloResponse, a, b);
  }
}

