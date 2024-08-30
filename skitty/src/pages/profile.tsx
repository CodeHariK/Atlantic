import { createSignal, createEffect } from "solid-js";
import { AuthUser, LogoutRequest, Role } from "../../api/auth/v1/auth_pb.ts";
import { GetProfileRequest } from "../../api/auth/v1/profile_pb.ts";

import { useConnect } from '../components/connect';

import { proto3 } from "@bufbuild/protobuf";

import SpaceLayout from '../layouts/SpaceLayout';

import { SuperTable } from "../components/table.tsx";
import { AddUserIcon, PenIcon, TableHeadingIcon } from "../components/svg.tsx";
import { Avatar, H3, ListTile, P, SmallBadgeText, TitleSubtitle } from "../components/heading.tsx";
import { MaterialButton, OutlinedButton } from "../components/button.tsx";

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
         console.error("Error refreshing auth:", err);
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
         {proto3.getEnumType(Role).findNumber(user()!.role)?.name}

         {user() ? (
            <>
               <div>
                  <div class="profile-header">
                     <img src={user()!.avatar} alt="Avatar" class="avatar" />
                     <h2>{user()!.username}</h2>
                     <p>Email: {user()!.email}</p>
                     <p>Role: {user()!.role}</p>
                     <p>Status: {user()!.verified ? "Verified" : "Not Verified"}</p>
                  </div>
                  <button class="logout-button" onClick={logout}>Logout</button>
               </div>

               {JSON.stringify(user()?.sessions[0])}

               <SuperTable
                  table={{
                     heading: [
                        <>User Agent {TableHeadingIcon()}</>,
                        <>Employees {TableHeadingIcon()}</>,
                        <>Employees {TableHeadingIcon()}</>,
                        <>Employees {TableHeadingIcon()}</>,
                     ],
                     rows: [
                        [
                           <ListTile
                              start={<Avatar src='https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg'></Avatar>}
                              title='Alexa Liras' subtitle='alexa@creative-tim.com'>
                           </ListTile>,
                           <TitleSubtitle
                              title='Alexa Liras' subtitle='alexa@creative-tim.com'>
                           </TitleSubtitle>,
                           <SmallBadgeText>Employees</SmallBadgeText>,
                           <P>19/09/17</P>,
                           <>{PenIcon()}</>,
                        ],
                     ]
                  }}
                  headerstart={<div>
                     <H3>Employees List</H3>
                     <P>Review each person before edit</P>
                  </div>}
                  headerend={
                     <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <OutlinedButton>
                           View All
                        </OutlinedButton>
                        <MaterialButton>
                           <AddUserIcon />
                           AddMember
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
         )}

      </SpaceLayout >
   );
};

