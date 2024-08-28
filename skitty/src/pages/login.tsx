import SpaceLayout from '../layouts/SpaceLayout';
import RefreshButton from "../components/refresh_button";
import LoginBox from "../components/login";

export default function NotFound() {
   return (
      <SpaceLayout two title='Login'>
         <div class="flex h-full">
            <LoginBox />
            <RefreshButton />
         </div>

         {/* <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
               <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                  <div>
                     <img src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                        class="w-32 mx-auto" />
                  </div>
                  <div class="mt-12 flex flex-col items-center">
                     <h1 class="text-2xl xl:text-3xl font-extrabold">
                        Sign up
                     </h1>
                     <div class="w-full flex-1 mt-8">
                        <div class="flex flex-col items-center">
                           <button
                              class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                              <div class="bg-white p-2 rounded-full">
                                 <svg class="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                       d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                       fill="#4285f4" />
                                    <path
                                       d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                       fill="#34a853" />
                                    <path
                                       d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                       fill="#fbbc04" />
                                    <path
                                       d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                       fill="#ea4335" />
                                 </svg>
                              </div>
                              <span class="ml-4">
                                 Sign Up with Google
                              </span>
                           </button>

                           <button
                              class="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                              <div class="bg-white p-1 rounded-full">
                                 <svg class="w-6" viewBox="0 0 32 32">
                                    <path fill-rule="evenodd"
                                       d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                                 </svg>
                              </div>
                              <span class="ml-4">
                                 Sign Up with GitHub
                              </span>
                           </button>
                        </div>

                        <div class="my-12 border-b text-center">
                           <div
                              class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                              Or sign up with e-mail
                           </div>
                        </div>

                        <div class="mx-auto max-w-xs">
                           <input
                              class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                              type="email" placeholder="Email" />
                           <input
                              class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                              type="password" placeholder="Password" />
                           <button
                              class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                              <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                 stroke-linecap="round" stroke-linejoin="round">
                                 <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                 <circle cx="8.5" cy="7" r="4" />
                                 <path d="M20 8v6M23 11h-6" />
                              </svg>
                              <span class="ml-3">
                                 Sign Up
                              </span>
                           </button>
                           <p class="mt-6 text-xs text-gray-600 text-center">
                              I agree to abide by templatana's
                              <a href="#" class="border-b border-gray-500 border-dotted">
                                 Terms of Service
                              </a>
                              and its
                              <a href="#" class="border-b border-gray-500 border-dotted">
                                 Privacy Policy
                              </a>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                  <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                     style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
                  </div>
               </div>
            </div>
         </div> */}
         {/* 
         <div id="login-popup" tabindex="-1"
            class="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">

               <div class="relative bg-white rounded-lg shadow">
                  <button type="button"
                     class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"><svg
                        aria-hidden="true" class="w-5 h-5" fill="#c6c7c7" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        ></path>
                     </svg>
                     <span class="sr-only">Close popup</span>
                  </button>

                  <div class="p-5">
                     <h3 class="text-2xl mb-0.5 font-medium"></h3>
                     <p class="mb-4 text-sm font-normal text-gray-800"></p>

                     <div class="text-center">
                        <p class="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                           Login to your account
                        </p>
                        <p class="mt-2 text-sm leading-4 text-slate-600">
                           You must be logged in to perform this action.
                        </p>
                     </div>

                     <div class="mt-7 flex flex-col gap-2">

                        <button
                           class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                              src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
                              class="h-[18px] w-[18px] " />
                           Continue with GitHub
                        </button>

                        <button
                           class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                              src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                              class="h-[18px] w-[18px] " />Continue with
                           Google
                        </button>


                        <button
                           class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                              src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="Google"
                              class="h-[18px] w-[18px] " />Continue with
                           LinkedIn
                        </button>
                     </div>

                     <div class="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                        <div class="h-px w-full bg-slate-200"></div>
                        OR
                        <div class="h-px w-full bg-slate-200"></div>
                     </div>


                     <form class="w-full">
                        <label for="email" class="sr-only">Email address</label>
                        <input name="email" type="email" autocomplete="email" required
                           class="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                           placeholder="Email Address" value="" />
                        <label for="password" class="sr-only">Password</label>
                        <input name="password" type="password" autocomplete="current-password" required
                           class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                           placeholder="Password" value="" />
                        <p class="mb-3 mt-2 text-sm text-gray-500">
                           <a href="/forgot-password" class="text-blue-800 hover:text-blue-600">Reset your password?</a>
                        </p>
                        <button type="submit"
                           class="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                           Continue
                        </button>
                     </form>

                     <div class="mt-6 text-center text-sm text-slate-600">
                        Don't have an account?
                        <a href="/signup" class="font-medium text-[#4285f4]">Sign up</a>
                     </div>
                  </div>
               </div>
            </div>
         </div> */}


      </SpaceLayout >
   );
}