import { GridLayout, Input, SpaceForm, CssUI } from 'solgaleo/ui';

import { createSignal } from "solid-js";
import { EmailLoginRequest } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../connect/connect.tsx';

import * as yup from 'yup';
import { AtlanticHeader } from '../components/header.tsx';
import { IconEmail } from 'solgaleo/svg';

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
      <GridLayout title='Login'
         header={<AtlanticHeader />}
         footer={<AtlanticHeader />}
      >
         <div class="justify-center h-full items-center flex">

            <div class="shadowh br2 p8 flex flex-col gap4">

               <h3 class="text-center">Login to your account</h3>
               <button class={CssUI.OutlinedButton}>
                  <IconEmail />
                  <h6>Continue with Google</h6>
               </button>

               <div class="w-full text-center">
                  OR
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

      </GridLayout >
   );
}