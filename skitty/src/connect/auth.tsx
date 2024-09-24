import { Setter } from "solid-js";
import { InvalidateAllSessionsRequest, RefreshRequest, RevokeRequest } from "../../api/auth/v1/auth_pb";
import { ConnectBox } from "./connect";

export const handleRefresh = async (connect: ConnectBox, setLoading: Setter<boolean>, setError: Setter<string>) => {
    setLoading(true);
    setError("");

    try {
        const request = new RefreshRequest();
        // Set any necessary fields in the request
        const response = await connect.authclient.authRefresh(request);
        console.log("Refresh successful:", response);
    } catch (err) {
        console.error("Error refreshing auth:", err);
        setError("Failed to refresh authentication.");
    } finally {
        setLoading(false);
    }
};

export const RevokeReq = async (connect: ConnectBox, sessionNumber: number) => {
    try {
        const request = new RevokeRequest({ sessionNumber: sessionNumber });
        // Set any necessary fields in the request
        const response = await connect.authclient.revokeSession(request);
        console.log("Logout successful:", response);
    } catch (err) {
        console.error("Error logout:", err);
    }
};

export const Revoke = async (connect: ConnectBox, sessionNumber: number, setLoading: Setter<boolean>, setError: Setter<string>) => {
    setLoading(true);
    setError("");
    try {
        const request = new RevokeRequest({ sessionNumber: sessionNumber });
        // Set any necessary fields in the request
        const response = await connect.authclient.revokeSession(request);
        console.log("Logout successful:", response);
    } catch (err) {
        console.error("Error logout:", err);
        setError("Failed to logout.");
    } finally {
        setLoading(false);
    }
};

export const RevokeAll = async (connect: ConnectBox, setLoading: Setter<boolean>, setError: Setter<string>) => {
    console.log("RevokeAll")
    setLoading(true);
    setError("");
    try {
        const request = new InvalidateAllSessionsRequest({});
        // Set any necessary fields in the request
        const response = await connect.authclient.invalidateAllSessions(request);
        console.log("Revoke successful:", response);
        window.location.href = "/login";
    } catch (err) {
        console.error("Error logout:", err);
        setError("Failed to logout.");
    } finally {
        setLoading(false);
    }
};