import { type JSX } from 'solid-js';

import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createConnectTransport } from "@connectrpc/connect-web";
import { Code, ConnectError, createPromiseClient, PromiseClient } from '@connectrpc/connect';
import { AuthService } from "../../api/auth/v1/auth_connect.ts";
import { ProfileService } from "../../api/auth/v1/profile_connect.ts";
import { UserService } from "../../api/user/v1/user_connect.ts";
import { InventoryService } from "../../api/inventory/v1/inventory_connect.ts";
import { Atlantic } from '../data/Constants.ts';

// Define the types for the services
type AuthConnect = PromiseClient<typeof AuthService>;
type ProfileConnect = PromiseClient<typeof ProfileService>;
type UserConnect = PromiseClient<typeof UserService>;
type InventoryConnect = PromiseClient<typeof InventoryService>;

import { Interceptor } from '@connectrpc/connect';
import { RefreshRequest } from '../../api/auth/v1/auth_pb.ts';

const interceptor: (authclient: AuthConnect) => Interceptor = (authclient: AuthConnect) => (next) => async (req) => {
    console.log(`Sending request to ${req.url}`);

    let response;

    try {
        response = await next(req);
        console.log(response)
        let redirect = response.header.get('redirect-to')
        if (redirect) {
            window.location.href = redirect;
        }
        return response
    } catch (error) {
        if (error instanceof ConnectError && error.code == Code.Unauthenticated) {
            try {
                const request = new RefreshRequest();
                await authclient.authRefresh(request);
                console.log("Refresh successful:", response);
                response = await next(req);
                console.log("Retried request successful:", response);
                let redirect = response.header.get('redirect-to')
                if (redirect) {
                    window.location.href = redirect;
                }
                return response
            } catch (err) {
                console.error("Error refreshing auth:", err);
            }
        }
        throw error
    }
}

interface ConnectClients {
    authclient: AuthConnect;
    profileclient: ProfileConnect;
    userclient: UserConnect;
    inventoryclient: InventoryConnect;
}

// Create the context with a default value of undefined
const ConnectContext = createContext<ConnectClients | undefined>(undefined);

type ConnectProviderProps = {
    children: JSX.Element;
};

export function ConnectProvider(props: ConnectProviderProps) {

    const authBaseTransport = createConnectTransport({
        baseUrl: Atlantic,
        credentials: "include",
    })

    const authTransport = createConnectTransport({
        baseUrl: Atlantic,
        credentials: "include",
        interceptors: [interceptor(createPromiseClient(AuthService, authBaseTransport))],
    });

    const inventoryTransport = createConnectTransport({
        baseUrl: Atlantic,
        credentials: "include",
        interceptors: [interceptor(createPromiseClient(AuthService, authBaseTransport))],
    });

    const [clients] = createStore<ConnectClients>({
        authclient: createPromiseClient(AuthService, authTransport),
        profileclient: createPromiseClient(ProfileService, authTransport),
        userclient: createPromiseClient(UserService, authTransport),
        inventoryclient: createPromiseClient(InventoryService, inventoryTransport),
    });

    return (
        <ConnectContext.Provider value={clients}>
            {props.children}
        </ConnectContext.Provider>
    );
}

export function useConnect(): ConnectClients {
    const context = useContext(ConnectContext);
    if (!context) {
        throw new Error("useClients must be used within a ClientsProvider");
    }
    return context;
}