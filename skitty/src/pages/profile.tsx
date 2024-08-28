import { createSignal, createEffect } from "solid-js";
import { AuthUser, LogoutRequest } from "../../api/auth/v1/auth_pb.ts";
import { GetProfileRequest } from "../../api/auth/v1/profile_pb.ts";

import { useConnect } from '../components/connect';

import SpaceLayout from '../layouts/SpaceLayout';

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
         // Set any necessary fields in the request

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

   // const revokeSession = (sessionId: string) => {
   //     // Logic to revoke the session
   //     fetch(`/api/sessions/revoke/${sessionId}`, { method: "POST" })
   //         .then(() => {
   //             // Update the session list after revoking
   //             setUser((prevUser) =>
   //                 prevUser
   //                     ? { ...prevUser, sessions: prevUser.sessions.filter((session) => session.id !== sessionId) }
   //                     : null
   //             );
   //         })
   //         .catch((err) => console.error(err));
   // };

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
               <div class="profile-header">
                  <img src={user()!.avatar} alt="Avatar" class="avatar" />
                  <h2>{user()!.username}</h2>
                  <p>Email: {user()!.email}</p>
                  <p>Status: {user()!.verified ? "Verified" : "Not Verified"}</p>
               </div>

               {/* <div class="session-table">
                     <h3>Active Sessions</h3>
                     <table>
                           <thead>
                              <tr>
                                 <th>ID</th>
                                 <th>IP Address</th>
                                 <th>Device</th>
                                 <th>Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              {user()!.sessions.map((session) => (
                                 <tr key={session.id}>
                                       <td>{session.id}</td>
                                       <td>{session.ip}</td>
                                       <td>{session.device}</td>
                                       <td>
                                          <button onClick={() => revokeSession(session.id)}>Revoke</button>
                                       </td>
                                 </tr>
                              ))}
                           </tbody>
                     </table>
                  </div> */}

               <button class="logout-button" onClick={logout}>Logout</button>
            </>
         ) : (
            <p> {loading() ? "Loading..." : ""}  {error()}</p>
         )}


         <h6 class="text-lg font-bold dark:text-white">Sessions</h6>

         <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
               <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                     <th scope="col" class="p-4">
                        <div class="flex items-center">
                           <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                           <label for="checkbox-all" class="sr-only">checkbox</label>
                        </div>
                     </th>
                     <th scope="col" class="px-6 py-3">
                        Product name
                     </th>
                     <th scope="col" class="px-6 py-3">
                        Color
                     </th>
                     <th scope="col" class="px-6 py-3">
                        Category
                     </th>
                     <th scope="col" class="px-6 py-3">
                        Price
                     </th>
                     <th scope="col" class="px-6 py-3">
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                     <td class="w-4 p-4">
                        <div class="flex items-center">
                           <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                           <label for="checkbox-table-1" class="sr-only">checkbox</label>
                        </div>
                     </td>
                     <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                     </th>
                     <td class="px-6 py-4">
                        Silver
                     </td>
                     <td class="px-6 py-4">
                        Laptop
                     </td>
                     <td class="px-6 py-4">
                        $2999
                     </td>
                     <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>


         <div class="max-w-[720px] mx-auto">

            <div class="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">

               <div class="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                  <div class="flex items-center justify-between ">
                     <div>
                        <h3 class="text-lg font-semibold text-slate-800">Employees List</h3>
                        <p class="text-slate-500">Review each person before edit</p>
                     </div>
                     <div class="flex flex-col gap-2 shrink-0 sm:flex-row">
                        <button
                           class="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                           type="button">
                           View All
                        </button>
                        <button
                           class="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                           type="button">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                              stroke-width="2" class="w-4 h-4">
                              <path
                                 d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                              </path>
                           </svg>
                           Add member
                        </button>
                     </div>
                  </div>

               </div>

               <div class="p-0 overflow-scroll">
                  <table class="w-full mt-4 text-left table-auto min-w-max">
                     <thead>
                        <tr>
                           <th
                              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                              <p
                                 class="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                 Member
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                       d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                 </svg>
                              </p>
                           </th>
                           <th
                              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                              <p
                                 class="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                 Function
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                       d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                 </svg>
                              </p>
                           </th>
                           <th
                              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                              <p
                                 class="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                 Status
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                       d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                 </svg>
                              </p>
                           </th>
                           <th
                              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                              <p
                                 class="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                 Employed
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                       d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                 </svg>
                              </p>
                           </th>
                           <th
                              class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                              <p
                                 class="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                              </p>
                           </th>
                        </tr>
                     </thead>
                     <tbody>

                        <tr>
                           <td class="p-4 border-b border-slate-200">
                              <div class="flex items-center gap-3">
                                 <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg"
                                    alt="Alexa Liras" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                                 <div class="flex flex-col">
                                    <p class="text-sm font-semibold text-slate-700">
                                       Alexa Liras
                                    </p>
                                    <p
                                       class="text-sm text-slate-500">
                                       alexa@creative-tim.com
                                    </p>
                                 </div>
                              </div>
                           </td>
                           <td class="p-4 border-b border-slate-200">
                              <div class="flex flex-col">
                                 <p class="text-sm font-semibold text-slate-700">
                                    Designer
                                 </p>
                                 <p
                                    class="text-sm text-slate-500">
                                    Marketing
                                 </p>
                              </div>
                           </td>
                           <td class="p-4 border-b border-slate-200">
                              <div class="w-max">
                                 <div
                                    class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-slate-100 text-slate-500">
                                    <span class="">offline</span>
                                 </div>
                              </div>
                           </td>
                           <td class="p-4 border-b border-slate-200">
                              <p class="text-sm text-slate-500">
                                 23/04/18
                              </p>
                           </td>
                           <td class="p-4 border-b border-slate-200">
                              <button
                                 class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                 type="button">
                                 <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                       class="w-4 h-4">
                                       <path
                                          d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                       </path>
                                    </svg>
                                 </span>
                              </button>
                           </td>
                        </tr>

                        <tr>
                           <td class="p-4 border-b border-slate-200">
                              <div class="flex items-center gap-3">
                                 <img src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg"
                                    alt="Laurent Perrier"
                                    class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                                 <div class="flex flex-col">
                                    <p class="text-sm font-semibold text-slate-700">
                                       Laurent Perrier
                                    </p>
                                    <p
                                       class="text-sm text-slate-500">
                                       laurent@creative-tim.com
                                    </p>
                                 </div>
                              </div>
                           </td>
                           <td class="p-4 border-b border-slate-200">
                              <div class="flex flex-col">
                                 <p class="text-sm font-semibold text-slate-700">
                                    Executive
                                 </p>
                                 <p
                                    class="text-sm text-slate-500">
                                    Projects
                                 </p>
                              </div>
                           </td>
                           <td class="p-4 border-b border-slate-200">
                              <div class="w-max">
                                 <div
                                    class="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                                    <span class="">online</span>
                                 </div>
                              </div>
                           </td>
                           <td class="p-4 border-b border-slate-200">
                              <p class="text-sm text-slate-500">
                                 19/09/17
                              </p>
                           </td>
                           <td class="p-4 border-b border-slate-200">
                              <button
                                 class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                 type="button">
                                 <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                       class="w-4 h-4">
                                       <path
                                          d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                       </path>
                                    </svg>
                                 </span>
                              </button>
                           </td>
                        </tr>

                     </tbody>
                  </table>
               </div>

               <div class="flex items-center justify-between p-3">
                  <p class="block text-sm text-slate-500">
                     Page 1 of 10
                  </p>
                  <div class="flex gap-1">
                     <button
                        class="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Previous
                     </button>
                     <button
                        class="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Next
                     </button>
                  </div>
               </div>

            </div>

         </div>




         <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
               <img class="p-8 rounded-t-lg" src="	https://flowbite.com/docs/images/products/apple-watch.png" alt="product image" />
            </a>
            <div class="px-5 pb-5">
               <a href="#">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
               </a>
               <div class="flex items-center mt-2.5 mb-5">
                  <div class="flex items-center space-x-1 rtl:space-x-reverse">
                     <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                     </svg>
                     <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                     </svg>
                     <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                     </svg>
                     <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                     </svg>
                     <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                     </svg>
                  </div>
                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
               </div>
               <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                  <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
               </div>
            </div>
         </div>



      </SpaceLayout>
   );
};
