import { createSignal } from "solid-js";
import { RefreshRequest } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../components/connect';

export default function RefreshButton() {
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");

    const { authclient } = useConnect();

    const handleRefresh = async () => {
        setLoading(true);
        setError("");

        try {
            const request = new RefreshRequest();
            // Set any necessary fields in the request
            const response = await authclient.authRefresh(request);
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