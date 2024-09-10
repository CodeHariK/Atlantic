// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file sync/v1/sync.proto (package sync.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message sync.v1.SyncConfigRequest
 */
export class SyncConfigRequest extends Message<SyncConfigRequest> {
  /**
   * @generated from field: string hello = 1;
   */
  hello = "";

  constructor(data?: PartialMessage<SyncConfigRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sync.v1.SyncConfigRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "hello", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SyncConfigRequest {
    return new SyncConfigRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SyncConfigRequest {
    return new SyncConfigRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SyncConfigRequest {
    return new SyncConfigRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SyncConfigRequest | PlainMessage<SyncConfigRequest> | undefined, b: SyncConfigRequest | PlainMessage<SyncConfigRequest> | undefined): boolean {
    return proto3.util.equals(SyncConfigRequest, a, b);
  }
}

/**
 * @generated from message sync.v1.SyncConfigResponse
 */
export class SyncConfigResponse extends Message<SyncConfigResponse> {
  /**
   * @generated from field: string hi = 1;
   */
  hi = "";

  constructor(data?: PartialMessage<SyncConfigResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sync.v1.SyncConfigResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "hi", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SyncConfigResponse {
    return new SyncConfigResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SyncConfigResponse {
    return new SyncConfigResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SyncConfigResponse {
    return new SyncConfigResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SyncConfigResponse | PlainMessage<SyncConfigResponse> | undefined, b: SyncConfigResponse | PlainMessage<SyncConfigResponse> | undefined): boolean {
    return proto3.util.equals(SyncConfigResponse, a, b);
  }
}

/**
 * @generated from message sync.v1.ConverseRequest
 */
export class ConverseRequest extends Message<ConverseRequest> {
  /**
   * @generated from field: string sentence = 1;
   */
  sentence = "";

  constructor(data?: PartialMessage<ConverseRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sync.v1.ConverseRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConverseRequest {
    return new ConverseRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConverseRequest {
    return new ConverseRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConverseRequest {
    return new ConverseRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ConverseRequest | PlainMessage<ConverseRequest> | undefined, b: ConverseRequest | PlainMessage<ConverseRequest> | undefined): boolean {
    return proto3.util.equals(ConverseRequest, a, b);
  }
}

/**
 * ConverseResponse is a single sentence response sent in answer to a
 * ConverseRequest.
 *
 * @generated from message sync.v1.ConverseResponse
 */
export class ConverseResponse extends Message<ConverseResponse> {
  /**
   * @generated from field: string sentence = 1;
   */
  sentence = "";

  constructor(data?: PartialMessage<ConverseResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "sync.v1.ConverseResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "sentence", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ConverseResponse {
    return new ConverseResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ConverseResponse {
    return new ConverseResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ConverseResponse {
    return new ConverseResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ConverseResponse | PlainMessage<ConverseResponse> | undefined, b: ConverseResponse | PlainMessage<ConverseResponse> | undefined): boolean {
    return proto3.util.equals(ConverseResponse, a, b);
  }
}

