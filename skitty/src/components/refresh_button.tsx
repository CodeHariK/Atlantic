import { createSignal } from "solid-js";
import { createPromiseClient, type Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { AuthService } from "../../api/auth/v1/auth_connect.ts";
import { RefreshRequest } from "../../api/auth/v1/auth_pb.ts";

const transport = createConnectTransport({
    baseUrl: "http://localhost:7777", // Adjust based on your gRPC server
    credentials: "include",
});

const client = createPromiseClient(AuthService, transport);

export default function RefreshButton() {
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");

    const handleRefresh = async () => {
        setLoading(true);
        setError("");

        try {
            const request = new RefreshRequest();
            // Set any necessary fields in the request
            const response = await client.authRefresh(request);
            console.log("Refresh successful:", response);
        } catch (err) {
            console.error("Error refreshing auth:", err);
            setError("Failed to refresh authentication.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleRefresh} disabled={loading()}>
                {loading() ? "Refreshing..." : "Refresh Auth"}
            </button>
            {error() && <p style={{ color: "red" }}>{error()}</p>}
        </div>
    );
}