import { createSignal, createEffect } from "solid-js";
import { AuthUser, RevokeRequest, InvalidateAllSessionsRequest, RefreshRequest, Role } from "../../api/auth/v1/auth_pb.ts";
import { GetProfileRequest } from "../../api/auth/v1/profile_pb.ts";

import { useConnect } from '../components/connect';

import { proto3 } from "@bufbuild/protobuf";

import SpaceLayout from '../layouts/SpaceLayout';

import { SuperTable } from "../components/table.tsx";
import { CrossIcon, TableHeadingIcon } from "../components/svg.tsx";
import { H3, P, SmallBadgeText } from "../components/heading.tsx";
import { IconButton, MaterialButton, OutlinedButton } from "../components/button.tsx";

export default function Profile() {
   const [user, setUser] = createSignal<AuthUser | null>(null);
   const [loading, setLoading] = createSignal(false);
   const [error, setError] = createSignal("");

   const { authclient, profileclient } = useConnect();

   // Fetch the user data (you might be fetching this from an API)
   createEffect(async () => {
      setLoading(true);
      setError("");

      try {
         const request = new GetProfileRequest();
         const response = await profileclient.getProfile(request);
         console.log("Get Profile successful:", response);

         if (response.user) {
            setUser(response.user)
         }
      } catch (err) {
         console.error("Failed to get profile:", err);
         setError("Failed to get profile.");
      } finally {
         setLoading(false);
      }
   });

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

   const Revoke = async (sessionNumber: number) => {
      setLoading(true);
      setError("");
      try {
         const request = new RevokeRequest({ sessionNumber: sessionNumber });
         // Set any necessary fields in the request
         const response = await authclient.revokeSession(request);
         console.log("Logout successful:", response);
         if (!sessionNumber) {
            window.location.href = "/login";
         }
      } catch (err) {
         console.error("Error logout:", err);
         setError("Failed to logout.");
      } finally {
         setLoading(false);
      }
   };

   const RevokeAll = async () => {
      setLoading(true);
      setError("");
      try {
         const request = new InvalidateAllSessionsRequest({});
         // Set any necessary fields in the request
         const response = await authclient.invalidateAllSessions(request);
         console.log("Revoke successful:", response);
         window.location.href = "/login";
      } catch (err) {
         console.error("Error logout:", err);
         setError("Failed to logout.");
      } finally {
         setLoading(false);
      }
   };

   return (

      <SpaceLayout two title='Profile'>

         <MaterialButton onClick={handleRefresh} disabled={loading()} class='mt-1 mb-1 w-full justify-center' type='submit'>
            <p class='text-sm'>{loading() ? "Loading..." : "Refresh"}</p>
         </MaterialButton>

         {user() ? (
            <>
               <div>
                  <div class="profile-header">
                     {/* <img src={user()!.avatar} alt="Avatar" class="avatar" /> */}
                     <h2>{user()!.username}</h2>
                     <p>Email: {user()!.email}</p>

                     {
                        (() => {
                           let a = [];
                           for (let i = 0; i < 64; i++) {
                              // Check if the i-th bit is set in the role
                              let b = (user()!.role >> BigInt(i)) & BigInt(1)
                              if (b) {
                                 a.push(proto3.getEnumType(Role).findNumber(i + 1)?.name);
                              }
                           }
                           return <p>Role : {a.join(", ")}</p>;
                        })()
                     }


                     {/* <p>Role: {proto3.getEnumType(Role).findNumber(user()!.role.valueOf() & 1)?.name}</p> */}
                     <p>Status: {user()!.verified ? "Verified" : "Not Verified"}</p>
                     <p>Phone: {user()!.phoneNumber}</p>
                     <p>Location: {user()!.location}</p>
                  </div>
               </div>

               <SuperTable
                  width={900}

                  table={{
                     heading: [
                        <>User Agent {TableHeadingIcon()}</>,
                        <>Started {TableHeadingIcon()}</>,
                        <>Active {TableHeadingIcon()}</>,
                        <>Valid {TableHeadingIcon()}</>,
                        <>Revoke</>,
                     ],
                     class: [
                        "max-w-64",
                     ],
                     rows: [
                        ...user()?.sessions.map((s, i) =>
                           [
                              <P>{s.agent}</P>,
                              <P>{s.iat.toString()}</P>,
                              <SmallBadgeText>Active {i == user()?.sessionNumber ? ", Current" : ""}</SmallBadgeText>,
                              <P>{s.exp.toString()}</P>,
                              <IconButton onClick={() => { () => Revoke(i) }}><CrossIcon /></IconButton>
                           ]
                        ) ?? []
                     ],
                  }}
                  headerstart={<div>
                     <H3>Login sessions</H3>
                  </div>}
                  headerend={
                     <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
                        {/* <MaterialButton onClick={handleRefresh} disabled={loading()} class='mt-1 mb-1 w-full justify-center' type='submit'>
                           <p class='text-sm'>{loading() ? "Loading..." : "Refresh"}</p>
                        </MaterialButton> */}
                        <OutlinedButton onClick={RevokeAll}>
                           Revoke All
                        </OutlinedButton>
                        <MaterialButton onClick={() => Revoke(-1)}>
                           Logout
                        </MaterialButton>
                        {error() && <p style={{ color: "red" }}>{error()}</p>}
                     </div>
                  }
                  footerstart={
                     <P>Page 1 of 10</P>
                  }
                  footerend={
                     <div class="flex gap-1">
                        <OutlinedButton>Previous</OutlinedButton>
                        <OutlinedButton>Next</OutlinedButton>
                     </div>
                  }
               ></SuperTable>

            </>
         ) : (
            <p> {loading() ? "Loading..." : ""}  {error()}</p>
         )
         }

      </SpaceLayout >
   );
};

