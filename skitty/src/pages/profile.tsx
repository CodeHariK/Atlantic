import { createSignal, createEffect } from "solid-js";
import { Role } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../connect/connect.tsx';

import { proto3 } from "@bufbuild/protobuf";

import { CssUI, SpaceLayout } from 'solgaleo/ui';
import { IconCross, IconTableHeading } from 'solgaleo/svg';
import { SuperTable } from 'solgaleo/adv';

import { handleRefresh, Revoke, RevokeAll } from "../connect/auth.tsx";
import { AtlanticHeader } from "../components/header.tsx";

export default function Profile() {
   // const [user, setUser] = createSignal<ProfileUser | null>(null);
   const [loading, setLoading] = createSignal(false);
   const [error, setError] = createSignal("");

   const connect = useConnect();

   // Fetch the user data (you might be fetching this from an API)
   createEffect(async () => {
      setLoading(true);
      setError("");

      if (connect.user) {
         setLoading(false)
      } else {
         setError("Not signed in")
      }

      console.log("-->", connect.user)

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

      <SpaceLayout title='Profile'
         header={<AtlanticHeader />}
         footer={<AtlanticHeader />}
      >
         <button onClick={() => { handleRefresh(connect, setLoading, setError) }} disabled={loading()}
            class={CssUI.MaterialButton + ' mt-1 mb-1 w-full justify-center'} type='submit'>
            <p class='text-sm'>{loading() ? "Loading..." : "Refresh"}</p>
         </button>

         {
            connect.user ? (
               <>
                  <div>
                     <div class="profile-header">
                        {/* <img src={user()!.avatar} alt="Avatar" class="avatar" /> */}
                        <h2>{connect.user!.username}</h2>
                        <p>Email: {connect.user!.email}</p>

                        {
                           (() => {
                              let a = [];
                              for (let i = 0; i < 64; i++) {
                                 // Check if the i-th bit is set in the role
                                 let b = (connect.user!.role >> BigInt(i)) & BigInt(1)
                                 if (b) {
                                    a.push(proto3.getEnumType(Role).findNumber(i + 1)?.name);
                                 }
                              }
                              return <p>Role : {a.join(", ")}</p>;
                           })()
                        }

                        {/* <p>Role: {proto3.getEnumType(Role).findNumber(user()!.role.valueOf() & 1)?.name}</p> */}
                        <p>Status: {connect.user!.verified ? "Verified" : "Not Verified"}</p>
                        <p>Phone: {connect.user!.phoneNumber}</p>
                        <p>Location: {connect.user!.location}</p>
                     </div>
                  </div>

                  <SuperTable
                     class={"max-w-[1000px]"}

                     table={{
                        heading: [
                           <>User Agent {<IconTableHeading />}</>,
                           <>Started {<IconTableHeading />}</>,
                           <>Active {<IconTableHeading />}</>,
                           <>Valid {<IconTableHeading />}</>,
                           <>Revoke</>,
                        ],
                        class: [
                           "max-w-64",
                        ],
                        rows: [
                           ...connect.user?.sessions.map((s, i) =>
                              [
                                 <p>{s.agent}</p>,

                                 <p>{(() => {
                                    let d = new Date(Number(s.iat) * 1000)
                                    return d.toLocaleDateString() + " (" + d.toLocaleTimeString() + ")"
                                 })()}</p>,
                                 <p>Active {i == connect.user?.sessionNumber ? ", Current" : ""}</p>,
                                 <p>{s.exp.toString()}</p>,
                                 <button class={CssUI.IconButton}
                                    onClick={() => Revoke(connect, i, setLoading, setError)}>
                                    <IconCross /></button>
                              ]
                           ) ?? []
                        ],
                     }}
                     headerstart={<div>
                        <h3>Login sessions</h3>
                     </div>}
                     headerend={
                        <div class="flex flex-row gap-2 shrink-0 sm:flex-row">
                           <button class={CssUI.OutlinedButton} onClick={() => { RevokeAll(connect, setLoading, setError) }}>
                              Revoke All
                           </button>
                           <button class={CssUI.MaterialButton} onClick={() => Revoke(connect, -1, setLoading, setError)}>
                              Logout
                           </button>
                        </div>
                     }
                     footerstart={
                        <p>Page 1 of 10</p>
                     }
                     footerend={
                        <div class="flex gap-1">
                           <button class={CssUI.MaterialButton}>Previous</button>
                           <button class={CssUI.MaterialButton}>Next</button>
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
