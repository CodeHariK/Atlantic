import { createEffect, type JSX } from "solid-js";

import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { createConnectTransport } from "@connectrpc/connect-web";
import {
   Code,
   ConnectError,
   createClient,
   Client,
   Interceptor
} from "@connectrpc/connect";
import { create } from "@bufbuild/protobuf";
import { AuthService, RefreshRequestSchema } from "../../api/auth/v1/auth_pb";
import { ProfileService, GetProfileRequestSchema, ProfileUser } from "../../api/auth/v1/profile_pb";
import { UserService } from "../../api/user/v1/user_pb";
import { InventoryService } from "../../api/inventory/v1/inventory_pb";
import { CosmogService } from "../../api/cosmog/v1/cosmog_pb";
import { ProductService } from "../../api/product/v1/product_pb";
import { OrdersService } from "../../api/orders/v1/orders_pb";
import { CartService, GetCartRequestSchema, Cart } from "../../api/cart/v1/cart_pb";
import { Atlantic } from "../data/Constants.ts";

// Define the types for the services
type AuthConnect = Client<typeof AuthService>;
type ProfileConnect = Client<typeof ProfileService>;
type UserConnect = Client<typeof UserService>;
type InventoryConnect = Client<typeof InventoryService>;
type CosmogConnect = Client<typeof CosmogService>;
type ProductConnect = Client<typeof ProductService>;
type OrdersConnect = Client<typeof OrdersService>;
type CartConnect = Client<typeof CartService>;

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
               const request = create(RefreshRequestSchema);
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

type CartBox = {
   loading: boolean;
   cart: Cart;
}

export interface ConnectBox {
   authclient: AuthConnect;
   profileclient: ProfileConnect;
   userclient: UserConnect;
   inventoryclient: InventoryConnect;
   cosmogclient: CosmogConnect;
   productclient: ProductConnect;
   ordersclient: OrdersConnect;
   cartclient: CartConnect;

   user: ProfileUser | null;

   cartbox: CartBox | null;

   getCart: () => Promise<Cart | undefined>;
}

// Create the context with a default value of undefined
const ConnectContext = createContext<ConnectBox | undefined>(undefined);

type ConnectProviderProps = {
   children: JSX.Element;
};

export function ConnectProvider(props: ConnectProviderProps) {
   const baseTransport = createConnectTransport({
      baseUrl: Atlantic,
      fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
   });

   const transport = createConnectTransport({
      baseUrl: Atlantic,
      fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
      interceptors: [
         interceptor(createClient(AuthService, baseTransport)),
      ],
   });

   const [connectBox, setConnectBox] = createStore<ConnectBox>({
      authclient: createClient(AuthService, transport),
      profileclient: createClient(ProfileService, transport),
      userclient: createClient(UserService, transport),
      inventoryclient: createClient(InventoryService, transport),
      cosmogclient: createClient(CosmogService, transport),
      productclient: createClient(ProductService, transport),
      ordersclient: createClient(OrdersService, transport),
      cartclient: createClient(CartService, transport),

      user: null,
      cartbox: null,

      getCart: getCart
   });

   async function getProfile() {
      try {
         const request = create(GetProfileRequestSchema);
         const response = await connectBox.profileclient.getProfile(request);

         if (response.user) {
            console.log("Get Profile successful:", response);
            setConnectBox("user", response.user);
         }
      } catch (err) {
         console.error("Failed to get profile:", err);
      }
   }

   async function getCart() {
      try {
         setConnectBox("cartbox", { loading: true });
         await (new Promise(resolve => setTimeout(resolve, 500)))
         const request = create(GetCartRequestSchema);
         const response = await connectBox.cartclient.getCart(request);

         if (response) {
            console.log("Get Cart successful:", response);

            setConnectBox("cartbox", { cart: response });
            await (new Promise(resolve => setTimeout(resolve, 500)))
            setConnectBox("cartbox", { loading: false });
         }
         return response
      } catch (err) {
         console.error("Failed to get cart:", err);
         setConnectBox("cartbox", { loading: false });
      }
   }


   // Fetch the user data (you might be fetching this from an API)
   createEffect(async () => {
      await getProfile();

      await getCart();
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
