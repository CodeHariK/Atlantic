import { createEffect, type JSX } from "solid-js";

import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { createConnectTransport } from "@connectrpc/connect-web";
import {
   Code,
   ConnectError,
   createPromiseClient,
   PromiseClient,
} from "@connectrpc/connect";
import { AuthService } from "../../api/auth/v1/auth_connect.ts";
import { ProfileService } from "../../api/auth/v1/profile_connect.ts";
import { UserService } from "../../api/user/v1/user_connect.ts";
import { InventoryService } from "../../api/inventory/v1/inventory_connect.ts";
import { CosmogService } from "../../api/cosmog/v1/cosmog_connect.ts";
import { Atlantic } from "../data/Constants.ts";

// Define the types for the services
type AuthConnect = PromiseClient<typeof AuthService>;
type ProfileConnect = PromiseClient<typeof ProfileService>;
type UserConnect = PromiseClient<typeof UserService>;
type InventoryConnect = PromiseClient<typeof InventoryService>;
type CosmogConnect = PromiseClient<typeof CosmogService>;

import { Interceptor } from "@connectrpc/connect";
import { RefreshRequest } from "../../api/auth/v1/auth_pb.ts";
import { GetProfileRequest, ProfileUser } from "../../api/auth/v1/profile_pb.ts";

const interceptor: (authclient: AuthConnect) => Interceptor =
   (authclient: AuthConnect) => (next) => async (req) => {
      console.log(`Sending request to ${req.url}`);

      let response;

      try {
         response = await next(req);
         console.log(response);
         let redirect = response.header.get("redirect-to");
         if (redirect) {
            window.location.href = redirect;
         }
         return response;
      } catch (error) {
         if (
            error instanceof ConnectError &&
            error.code == Code.Unauthenticated
         ) {
            try {
               const request = new RefreshRequest();
               await authclient.authRefresh(request);
               console.log("Refresh successful:", response);
               response = await next(req);
               console.log("Retried request successful:", response);
               let redirect = response.header.get("redirect-to");
               if (redirect) {
                  window.location.href = redirect;
               }
               return response;
            } catch (err) {
               console.error("Error refreshing auth:", err);
            }
         }
         throw error;
      }
   };

export interface ConnectBox {
   authclient: AuthConnect;
   profileclient: ProfileConnect;
   userclient: UserConnect;
   inventoryclient: InventoryConnect;
   cosmogclient: CosmogConnect;

   muser: ProfileUser | null;
}

// Create the context with a default value of undefined
const ConnectContext = createContext<ConnectBox | undefined>(undefined);

type ConnectProviderProps = {
   children: JSX.Element;
};

export function ConnectProvider(props: ConnectProviderProps) {
   const baseTransport = createConnectTransport({
      baseUrl: Atlantic,
      credentials: "include",
   });

   const transport = createConnectTransport({
      baseUrl: Atlantic,
      credentials: "include",
      interceptors: [
         interceptor(createPromiseClient(AuthService, baseTransport)),
      ],
   });

   const [connectBox, setConnectBox] = createStore<ConnectBox>({
      authclient: createPromiseClient(AuthService, transport),
      profileclient: createPromiseClient(ProfileService, transport),
      userclient: createPromiseClient(UserService, transport),
      inventoryclient: createPromiseClient(InventoryService, transport),
      cosmogclient: createPromiseClient(CosmogService, transport),
      muser: null,
   });

   // Fetch the user data (you might be fetching this from an API)
   createEffect(async () => {
      try {
         const request = new GetProfileRequest();
         const response = await connectBox.profileclient.getProfile(request);

         if (response.user) {
            console.log("Get Profile successful:", response);
            setConnectBox("muser", response.user)
         }
      } catch (err) {
         console.error("Failed to get profile:", err);
      } finally {
      }
   });

   // createMemo(() => {
   //    setTimeout(async () => {
   //       try {
   //          const request = new GetProfileRequest();
   //          const response = await clients.profileclient.getProfile(request);

   //          if (response.user) {
   //             console.log("Get Profile successful:", response);
   //             setClients("muser", response.user)
   //          }
   //       } catch (err) {
   //          console.error("Failed to get profile:", err);
   //       } finally {
   //       }
   //    }, 1000)
   // })

   return (
      <ConnectContext.Provider value={connectBox}>
         {props.children}
      </ConnectContext.Provider>
   );
}

export function useConnect(): ConnectBox {
   const context = useContext(ConnectContext);
   if (!context) {
      throw new Error("useClients must be used within a ClientsProvider");
   }
   return context;
}
