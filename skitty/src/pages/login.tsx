import SpaceLayout from '../layouts/SpaceLayout';
import { EmailIcon, GoogleIcon } from '../components/svg';
import { GradientText, H3, H6, P } from '../components/heading';
import { MaterialButton, OutlinedButton } from '../components/button';
import { SpaceForm } from '../components/spaceform';
import { TextInput } from '../components/textinput';

import { createSignal } from "solid-js";
import { EmailLoginRequest } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../connect/connect.tsx';

import * as yup from 'yup';

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
      <SpaceLayout two title='Login'>

         <div class="justify-center h-full items-center flex">

            <div class="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow p-5">

               <H3 class="text-center">Login to your account</H3>

               <div class="mt-7 flex flex-col gap-2">
                  <OutlinedButton class='justify-center'>
                     <GoogleIcon />
                     <H6>Continue with Google</H6>
                  </OutlinedButton>
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
                  <TextInput name="email" icon={EmailIcon()} label='Email Address' type="text" placeholder="alien@atlantic.io"></TextInput>
                  <TextInput name="password" type="password" label='Password' placeholder="******" />

                  <P class='py-1'>

                     <MaterialButton disabled={loading()} class='mt-1 mb-1 w-full justify-center' type='submit'>
                        <p class='text-sm'>{loading() ? "Loading..." : "Continue"}</p>
                     </MaterialButton>

                     {error() && <p style='AppErrorText'>{error()}</p>}

                     <a href='/forgot-password'><GradientText>Reset your password?</GradientText></a>
                  </P>
               </SpaceForm>

               <P class='mt-4 text-center'>Don't have an account?
                  <a href='/register'><GradientText> Sign up</GradientText></a>
               </P>
            </div>
         </div>

      </SpaceLayout >
   );
}