import { createSignal, createEffect } from "solid-js";
import { Role } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../connect/connect.tsx';

import { proto3 } from "@bufbuild/protobuf";

import SpaceLayout from '../layouts/SpaceLayout';

import { SuperTable } from "../components/table.tsx";
import { CrossIcon, TableHeadingIcon } from "../components/svg.tsx";
import { H3, P, SmallBadgeText } from "../components/heading.tsx";
import { IconButton, MaterialButton, OutlinedButton } from "../components/button.tsx";
import { handleRefresh, Revoke, RevokeAll } from "../connect/auth.tsx";

export default function Profile() {
   // const [user, setUser] = createSignal<ProfileUser | null>(null);
   const [loading, setLoading] = createSignal(false);
   const [error, setError] = createSignal("");

   const connect = useConnect();

   // Fetch the user data (you might be fetching this from an API)
   createEffect(async () => {
      setLoading(true);
      setError("");

      if (connect.muser) {
         setLoading(false)
      } else {
         setError("Not signed in")
      }

      console.log("-->", connect.muser)

      // try {
      //    const request = new GetProfileRequest();
      //    const response = await connect.profileclient.getProfile(request);

      //    if (response.user) {
      //       console.log("Get Profile successful:", response);
      //       setUser(response.user)
      //    }
      // } catch (err) {
      //    console.error("Failed to get profile:", err);
      //    setError("Failed to get profile.");
      // } finally {
      //    setLoading(false);
      // }
   });

   // const muser = createMemo(() => user());

   return (

      <SpaceLayout two title='Profile'>
         <MaterialButton onClick={() => { handleRefresh(connect, setLoading, setError) }} disabled={loading()} class='mt-1 mb-1 w-full justify-center' type='submit'>
            <p class='text-sm'>{loading() ? "Loading..." : "Refresh"}</p>
         </MaterialButton>

         {connect.muser ? (
            <>
               <div>
                  <div class="profile-header">
                     {/* <img src={user()!.avatar} alt="Avatar" class="avatar" /> */}
                     <h2>{connect.muser!.username}</h2>
                     <p>Email: {connect.muser!.email}</p>

                     {
                        (() => {
                           let a = [];
                           for (let i = 0; i < 64; i++) {
                              // Check if the i-th bit is set in the role
                              let b = (connect.muser!.role >> BigInt(i)) & BigInt(1)
                              if (b) {
                                 a.push(proto3.getEnumType(Role).findNumber(i + 1)?.name);
                              }
                           }
                           return <p>Role : {a.join(", ")}</p>;
                        })()
                     }

                     {/* <p>Role: {proto3.getEnumType(Role).findNumber(user()!.role.valueOf() & 1)?.name}</p> */}
                     <p>Status: {connect.muser!.verified ? "Verified" : "Not Verified"}</p>
                     <p>Phone: {connect.muser!.phoneNumber}</p>
                     <p>Location: {connect.muser!.location}</p>
                  </div>
               </div>

               <SuperTable
                  class={"max-w-[1000px]"}

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
                        ...connect.muser?.sessions.map((s, i) =>
                           [
                              <P>{s.agent}</P>,

                              <P>{(() => {
                                 let d = new Date(Number(s.iat) * 1000)
                                 return d.toLocaleDateString() + " (" + d.toLocaleTimeString() + ")"
                              })()}</P>,
                              <SmallBadgeText>Active {i == connect.muser?.sessionNumber ? ", Current" : ""}</SmallBadgeText>,
                              <P>{s.exp.toString()}</P>,
                              <IconButton onClick={() => Revoke(connect, i, setLoading, setError)}><CrossIcon /></IconButton>
                           ]
                        ) ?? []
                     ],
                  }}
                  headerstart={<div>
                     <H3>Login sessions</H3>
                  </div>}
                  headerend={
                     <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <OutlinedButton onClick={() => { RevokeAll(connect, setLoading, setError) }}>
                           Revoke All
                        </OutlinedButton>
                        <MaterialButton onClick={() => Revoke(connect, -1, setLoading, setError)}>
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
