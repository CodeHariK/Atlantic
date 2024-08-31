// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file auth/v1/auth.proto (package auth.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { EmailLoginRequest, EmailLoginResponse, InvalidateAllSessionsRequest, InvalidateAllSessionsResponse, LogoutRequest, LogoutResponse, RefreshRequest, RefreshResponse, RegisterUserRequest, RegisterUserResponse, RevokeRequest, RevokeResponse } from "./auth_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service auth.v1.AuthService
 */
export const AuthService = {
  typeName: "auth.v1.AuthService",
  methods: {
    /**
     * Defines the EmailLogin RPC method
     *
     * @generated from rpc auth.v1.AuthService.EmailLogin
     */
    emailLogin: {
      name: "EmailLogin",
      I: EmailLoginRequest,
      O: EmailLoginResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Defines the EmailLogin RPC method
     *
     * @generated from rpc auth.v1.AuthService.RegisterUser
     */
    registerUser: {
      name: "RegisterUser",
      I: RegisterUserRequest,
      O: RegisterUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Defines the EmailLogin RPC method
     *
     * @generated from rpc auth.v1.AuthService.AuthRefresh
     */
    authRefresh: {
      name: "AuthRefresh",
      I: RefreshRequest,
      O: RefreshResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Defines the Logout RPC method
     *
     * @generated from rpc auth.v1.AuthService.Logout
     */
    logout: {
      name: "Logout",
      I: LogoutRequest,
      O: LogoutResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Defines the RevokeSessions RPC method
     *
     * @generated from rpc auth.v1.AuthService.RevokeSession
     */
    revokeSession: {
      name: "RevokeSession",
      I: RevokeRequest,
      O: RevokeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Defines the InvalidateAllSessions RPC method
     *
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

