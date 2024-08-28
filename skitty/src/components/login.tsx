import { createSignal } from "solid-js";
import { EmailLoginRequest } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../components/connect';


export default function LoginBox() {
    const [loading, setLoading] = createSignal(false);
    const [error, setError] = createSignal("");

    const { authclient } = useConnect();

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        try {
            const request = new EmailLoginRequest({
                email: email,
                password: password,
            });
            // Set any necessary fields in the request
            const response = await authclient.emailLogin(request);
            console.log("Login successful:", response);
            // if (response.headers.get("Redirect-To")) {
            //     window.location.href =
            //         response.headers.get("Redirect-To");
            // }
        } catch (err) {
            console.error("Error login:", err);
            setError("Failed to login.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event: Event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setLoading(true);
        setError("");

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            // Create and set the fields of the gRPC request
            const request = new EmailLoginRequest({
                email: email,
                password: password,
            });

            // Make the gRPC request
            const response = await authclient.emailLogin(request);

            console.log("Login successful:", response);

        } catch (err) {
            console.error("Error during login:", err);
            setError("Failed to login.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <h2>EmailLogin</h2>
            <form id="login-form">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <br /><br />
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <br /><br />
            </form>
            <button onClick={handleLogin} disabled={loading()}>
                {loading() ? "Loading..." : "Login"}
            </button>
            {error() && <p style={{ color: "red" }}>{error()}</p>}

            <br></br>

            <form onSubmit={handleSubmit}>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" disabled={loading()}>
                    {loading() ? "Loading..." : "Login"}
                </button>
                {error() && <p style={{ color: "red" }}>{error()}</p>}
            </form>
        </div>
    );
}