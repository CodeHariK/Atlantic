import { type JSX } from 'solid-js';

import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createConnectTransport } from "@connectrpc/connect-web";
import { createPromiseClient, PromiseClient, Transport } from '@connectrpc/connect';
import { AuthService } from "../../api/auth/v1/auth_connect.ts";
import { ProfileService } from "../../api/auth/v1/profile_connect.ts";
import { UserService } from "../../api/user/v1/user_connect.ts";
import { Service } from '../data/Constants.ts';

// Define the types for the services
type AuthConnect = PromiseClient<typeof AuthService>;
type ProfileConnect = PromiseClient<typeof ProfileService>;
type UserConnect = PromiseClient<typeof UserService>;

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
    } catch (error) {
        console.log(error)
        try {
            const request = new RefreshRequest();
            await authclient.authRefresh(request);
            console.log("Refresh successful:", response);
            response = await next(req);
            console.log("Retried request successful:", response);
        } catch (err) {
            console.error("Error refreshing auth:", err);
        }
    }

    return response!
}

interface ConnectClients {
    authclient: AuthConnect;
    profileclient: ProfileConnect;
    userclient: UserConnect;
}

// Create the context with a default value of undefined
const ConnectContext = createContext<ConnectClients | undefined>(undefined);

type ConnectProviderProps = {
    children: JSX.Element;
};

export function ConnectProvider(props: ConnectProviderProps) {

    const baseTransport = createConnectTransport({
        baseUrl: Service.Auth,
        credentials: "include",
    })

    const transport = createConnectTransport({
        baseUrl: Service.Auth,
        credentials: "include",
        interceptors: [interceptor(createPromiseClient(AuthService, baseTransport))],
    });

    const [clients] = createStore<ConnectClients>(createConnectClients(transport));

    return (
        <ConnectContext.Provider value={clients}>
            {props.children}
        </ConnectContext.Provider>
    );
}

function createConnectClients(transport: Transport): ConnectClients {
    return {
        authclient: createPromiseClient(AuthService, transport),
        profileclient: createPromiseClient(ProfileService, transport),
        userclient: createPromiseClient(UserService, transport),
    };
}

export function useConnect(): ConnectClients {
    const context = useContext(ConnectContext);
    if (!context) {
        throw new Error("useClients must be used within a ClientsProvider");
    }
    return context;
}