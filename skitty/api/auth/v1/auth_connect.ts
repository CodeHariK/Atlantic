// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file auth/v1/auth.proto (package auth.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AckRefreshSessionRequest, AckRefreshSessionResponse, EmailLoginRequest, EmailLoginResponse, InvalidateAllSessionsRequest, InvalidateAllSessionsResponse, RefreshRequest, RefreshResponse, RegisterUserRequest, RegisterUserResponse, RevokeRequest, RevokeResponse } from "./auth_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service auth.v1.AuthService
 */
export const AuthService = {
  typeName: "auth.v1.AuthService",
  methods: {
    /**
     * @generated from rpc auth.v1.AuthService.EmailLogin
     */
    emailLogin: {
      name: "EmailLogin",
      I: EmailLoginRequest,
      O: EmailLoginResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc auth.v1.AuthService.RegisterUser
     */
    registerUser: {
      name: "RegisterUser",
      I: RegisterUserRequest,
      O: RegisterUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc auth.v1.AuthService.AuthRefresh
     */
    authRefresh: {
      name: "AuthRefresh",
      I: RefreshRequest,
      O: RefreshResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc auth.v1.AuthService.RevokeSession
     */
    revokeSession: {
      name: "RevokeSession",
      I: RevokeRequest,
      O: RevokeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc auth.v1.AuthService.AckRefreshSession
     */
    ackRefreshSession: {
      name: "AckRefreshSession",
      I: AckRefreshSessionRequest,
      O: AckRefreshSessionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc auth.v1.AuthService.InvalidateAllSessions
     */
    invalidateAllSessions: {
      name: "InvalidateAllSessions",
      I: InvalidateAllSessionsRequest,
      O: InvalidateAllSessionsResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

