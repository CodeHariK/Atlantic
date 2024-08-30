import { createSignal } from "solid-js";
import { RefreshRequest } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../components/connect';
import { MaterialButton } from "./button.tsx";

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
        <>
            <MaterialButton onClick={handleRefresh} disabled={loading()} class='mt-1 mb-1 w-full justify-center' type='submit'>
                <p class='text-sm'>{loading() ? "Loading..." : "Refresh"}</p>
            </MaterialButton>
            {error() && <p style={{ color: "red" }}>{error()}</p>}
        </>
    );
}