import { createSignal, createEffect } from "solid-js";
import { createPromiseClient, type Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { AuthService } from "../../api/auth/v1/auth_connect.ts";
import { AuthUser, LogoutRequest } from "../../api/auth/v1/auth_pb.ts";
import { ProfileService } from "../../api/auth/v1/profile_connect.ts";
import { GetProfileRequest } from "../../api/auth/v1/profile_pb.ts";

const transport = createConnectTransport({
    baseUrl: "http://localhost:7777",
    credentials: "include",
});

const authclient = createPromiseClient(AuthService, transport);
const profileclient = createPromiseClient(ProfileService, transport);

export function ProfilePage() {
    const [user, setUser] = createSignal<AuthUser | null>(null);
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");


    // Fetch the user data (you might be fetching this from an API)
    createEffect(async () => {
        setLoading(true);
        setError("");

        try {
            const request = new GetProfileRequest();
            // Set any necessary fields in the request

            const response = await profileclient.getProfile(request);
            console.log("Get Profile successful:", response);

            setUser(response.user)
        } catch (err) {
            console.error("Error refreshing auth:", err);
            setError("Failed to get profile.");
        } finally {
            setLoading(false);
        }
    });

    // const revokeSession = (sessionId: string) => {
    //     // Logic to revoke the session
    //     fetch(`/api/sessions/revoke/${sessionId}`, { method: "POST" })
    //         .then(() => {
    //             // Update the session list after revoking
    //             setUser((prevUser) =>
    //                 prevUser
    //                     ? { ...prevUser, sessions: prevUser.sessions.filter((session) => session.id !== sessionId) }
    //                     : null
    //             );
    //         })
    //         .catch((err) => console.error(err));
    // };

    const logout = async () => {
        setLoading(true);
        setError("");
        try {
            const request = new LogoutRequest();
            // Set any necessary fields in the request
            const response = await authclient.logout(request);
            console.log("Logout successful:", response);
            window.location.href = "/login";
        } catch (err) {
            console.error("Error logout:", err);
            setError("Failed to logout.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {user() ? (
                <>
                    <div class="profile-header">
                        <img src={user()!.avatar} alt="Avatar" class="avatar" />
                        <h2>{user()!.username}</h2>
                        <p>Email: {user()!.email}</p>
                        <p>Status: {user()!.verified ? "Verified" : "Not Verified"}</p>
                    </div>

                    {/* <div class="session-table">
                        <h3>Active Sessions</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>IP Address</th>
                                    <th>Device</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user()!.sessions.map((session) => (
                                    <tr key={session.id}>
                                        <td>{session.id}</td>
                                        <td>{session.ip}</td>
                                        <td>{session.device}</td>
                                        <td>
                                            <button onClick={() => revokeSession(session.id)}>Revoke</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}

                    <button class="logout-button" onClick={logout}>Logout</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
