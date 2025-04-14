import { SpaceLayout, Input, SpaceForm, CssUI } from 'solgaleo/ui';

import { createSignal } from "solid-js";
import { EmailLoginRequest } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../connect/connect.tsx';

import * as yup from 'yup';
import { AtlanticHeader } from '../components/header.tsx';
import { IconEmail, IconGoogle } from 'solgaleo/svg';

export const validationSchema = yup.object().shape({
   email: yup.string().email('Invalid email').required('Email is required'),
   password: yup.string().min(3, 'Password must be at least 3 characters long').required('Password is required'),
});

export default function Login() {

   const [loading, setLoading] = createSignal(false);
   const [error, setError] = createSignal("");

   const { authclient } = useConnect();

   type Credentials = {
      email: string,
      password: string
   };

   const login = async (cred: Credentials) => {
      setLoading(true);
      setError("");

      try {
         const request = new EmailLoginRequest({
            email: cred.email,
            password: cred.password,
         });
         // Set any necessary fields in the request
         const response = await authclient.emailLogin(request);
         console.log("Login successful:", response);
         // if (response.headers.get("Redirect-To")) {
         //     window.location.href =
         //         response.headers.get("Redirect-To");
         // }
      } catch (err) {
         console.error("Error login:", err);
         setError("Failed to login.");
      } finally {
         setLoading(false);
      }
   };


   return (
      <SpaceLayout title='Login'
         header={<AtlanticHeader />}
         footer={<AtlanticHeader />}
      >
         <div class="justify-center h-full items-center flex">

            <div class="w-full max-w-md secbg rounded-lg shadow p-5">

               <h3 class="text-center">Login to your account</h3>

               <div class="mt-7 flex flex-col gap-2">
                  <button class={CssUI.OutlinedButton}>
                     <IconGoogle />
                     <h6>Continue with Google</h6>
                  </button>
               </div>

               <div class="flex w-full items-center gap-2 py-6 text-sm text-slate-600 dark:text-slate-400">
                  <div class="h-px w-full bg-slate-200 dark:bg-slate-400"></div>
                  OR
                  <div class="h-px w-full bg-slate-200 dark:bg-slate-400"></div>
               </div>

               <SpaceForm id="Form"
                  schema={validationSchema}

                  onSubmit={(state) => {
                     login(state as Credentials)
                  }}
               >
                  <Input name="email" icon={<IconEmail />} label='Email Address' type="text" placeholder="alien@atlantic.io" />
                  <Input name="password" type="password" label='Password' placeholder="******" />

                  <p class='py-1'>

                     <button disabled={loading()} class={CssUI.MaterialButton + ' mt-1 mb-1 w-full justify-center'} type='submit'>
                        <p class='text-sm'>{loading() ? "Loading..." : "Continue"}</p>
                     </button>

                     {error() && <p style='AppErrorText'>{error()}</p>}

                     <a href='/forgot-password'>Reset your password?</a>
                  </p>
               </SpaceForm>

               <p class='mt-4 text-center'>Don't have an account?
                  <a href='/register'>Sign up</a>
               </p>
            </div>
         </div>

      </SpaceLayout >
   );
}