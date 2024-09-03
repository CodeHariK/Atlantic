import { type JSX } from 'solid-js';

import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createConnectTransport } from "@connectrpc/connect-web";
import { createPromiseClient, PromiseClient } from '@connectrpc/connect';
import { AuthService } from "../../api/auth/v1/auth_connect.ts";
import { ProfileService } from "../../api/auth/v1/profile_connect.ts";
import { UserService } from "../../api/user/v1/user_connect.ts";
import { Service } from '../data/Constants.ts';

// Define the types for the services
type AuthConnect = PromiseClient<typeof AuthService>;
type ProfileConnect = PromiseClient<typeof ProfileService>;
type UserConnect = PromiseClient<typeof UserService>;

import { Interceptor } from '@connectrpc/connect';

const logger: Interceptor = (next) => async (req) => {
    console.log(`Sending request to ${req.url}`);

    // Make the request
    const response = await next(req);

    console.log("-----")
    console.log(response)
    //       const request = new RefreshRequest();
    //       // Set any necessary fields in the request
    //       const response = await authclient.authRefresh(request);
    let sessionRefreshed = response.header.get('session-refreshed')
    if (sessionRefreshed) {
        console.log("Session Refresh")
    }
    console.log("-----")

    let redirect = response.header.get('redirect-to')
    if (redirect) {
        window.location.href = redirect;
    }

    return response;
};

interface ConnectContextType {
    authclient: AuthConnect;
    profileclient: ProfileConnect;
    userclient: UserConnect;
}

// Create the context with a default value of undefined
const ConnectContext = createContext<ConnectContextType | undefined>(undefined);

type ConnectProviderProps = {
    children: JSX.Element;
};

export function ConnectProvider(props: ConnectProviderProps) {
    const transport = createConnectTransport({
        baseUrl: Service.Auth,
        credentials: "include",
        interceptors: [logger],
    });

    const [clients] = createStore<ConnectContextType>({
        authclient: createPromiseClient(AuthService, transport),
        profileclient: createPromiseClient(ProfileService, transport),
        userclient: createPromiseClient(UserService, transport),
    });

    return (
        <ConnectContext.Provider value={clients}>
            {props.children}
        </ConnectContext.Provider>
    );
}

export function useConnect(): ConnectContextType {
    const context = useContext(ConnectContext);
    if (!context) {
        throw new Error("useClients must be used within a ClientsProvider");
    }
    return context;
}