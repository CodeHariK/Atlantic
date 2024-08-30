// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file auth/v1/profile.proto (package profile.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { AuthUser } from "./auth_pb.js";

/**
 * The message for fetching a profile
 *
 * @generated from message profile.v1.GetProfileRequest
 */
export class GetProfileRequest extends Message<GetProfileRequest> {
  constructor(data?: PartialMessage<GetProfileRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "profile.v1.GetProfileRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetProfileRequest {
    return new GetProfileRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetProfileRequest {
    return new GetProfileRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetProfileRequest {
    return new GetProfileRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetProfileRequest | PlainMessage<GetProfileRequest> | undefined, b: GetProfileRequest | PlainMessage<GetProfileRequest> | undefined): boolean {
    return proto3.util.equals(GetProfileRequest, a, b);
  }
}

/**
 * @generated from message profile.v1.GetProfileResponse
 */
export class GetProfileResponse extends Message<GetProfileResponse> {
  /**
   * @generated from field: auth.v1.AuthUser user = 1;
   */
  user?: AuthUser;

  constructor(data?: PartialMessage<GetProfileResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "profile.v1.GetProfileResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user", kind: "message", T: AuthUser },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetProfileResponse {
    return new GetProfileResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetProfileResponse {
    return new GetProfileResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetProfileResponse {
    return new GetProfileResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetProfileResponse | PlainMessage<GetProfileResponse> | undefined, b: GetProfileResponse | PlainMessage<GetProfileResponse> | undefined): boolean {
    return proto3.util.equals(GetProfileResponse, a, b);
  }
}

/**
 * The message for updating a profile
 *
 * @generated from message profile.v1.UpdateProfileRequest
 */
export class UpdateProfileRequest extends Message<UpdateProfileRequest> {
  constructor(data?: PartialMessage<UpdateProfileRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "profile.v1.UpdateProfileRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateProfileRequest {
    return new UpdateProfileRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateProfileRequest {
    return new UpdateProfileRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateProfileRequest {
    return new UpdateProfileRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateProfileRequest | PlainMessage<UpdateProfileRequest> | undefined, b: UpdateProfileRequest | PlainMessage<UpdateProfileRequest> | undefined): boolean {
    return proto3.util.equals(UpdateProfileRequest, a, b);
  }
}

/**
 * @generated from message profile.v1.UpdateProfileResponse
 */
export class UpdateProfileResponse extends Message<UpdateProfileResponse> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  constructor(data?: PartialMessage<UpdateProfileResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "profile.v1.UpdateProfileResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateProfileResponse {
    return new UpdateProfileResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateProfileResponse {
    return new UpdateProfileResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateProfileResponse {
    return new UpdateProfileResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateProfileResponse | PlainMessage<UpdateProfileResponse> | undefined, b: UpdateProfileResponse | PlainMessage<UpdateProfileResponse> | undefined): boolean {
    return proto3.util.equals(UpdateProfileResponse, a, b);
  }
}

