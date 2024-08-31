import { createSignal, createEffect } from "solid-js";
import { AuthUser, LogoutRequest, Role } from "../../api/auth/v1/auth_pb.ts";
import { GetProfileRequest } from "../../api/auth/v1/profile_pb.ts";

import { JSX } from "solid-js";

import { useConnect } from '../components/connect';

import { proto3 } from "@bufbuild/protobuf";

import SpaceLayout from '../layouts/SpaceLayout';

import { SuperTable } from "../components/table.tsx";
import { AddUserIcon, CrossIcon, PenIcon, TableHeadingIcon } from "../components/svg.tsx";
import { Avatar, H3, ListTile, P, SmallBadgeText, TitleSubtitle } from "../components/heading.tsx";
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

      <SpaceLayout two title='Profile'>
         {user() ? (
            <>
               <div>
                  <div class="profile-header">
                     {/* <img src={user()!.avatar} alt="Avatar" class="avatar" /> */}
                     <h2>{user()!.username}</h2>
                     <p>Email: {user()!.email}</p>
                     <p>Role: {proto3.getEnumType(Role).findNumber(user()!.role.valueOf())?.name}</p>
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
                        <>Delete</>,
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
                              <IconButton onClick={() => { console.log(i) }}><CrossIcon /></IconButton>
                           ]
                        ) ?? []
                     ],

                  }}
                  headerstart={<div>
                     <H3>Login sessions</H3>
                  </div>}
                  headerend={
                     <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <OutlinedButton>
                           View All
                        </OutlinedButton>
                        <MaterialButton onClick={logout}>
                           Logout
                        </MaterialButton>
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

