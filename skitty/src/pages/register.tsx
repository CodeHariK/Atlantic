import { GridLayout, CssUI, Input, SpaceForm } from 'solgaleo/ui';
import { IconEmail } from 'solgaleo/svg';

import { createSignal } from "solid-js";
import { RegisterUserRequest } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../connect/connect.tsx';

import * as yup from 'yup';
import { ConnectError } from '@connectrpc/connect';
import { AtlanticHeader } from '../components/header.tsx';

export const validationSchema = yup.object().shape({
   email: yup.string().email('Invalid email').required('Email is required'),
   password: yup.string().min(3, 'Password must be at least 3 characters long').required('Password is required'),
   confirmpassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
});

export default function Register() {

   const [loading, setLoading] = createSignal(false);
   const [error, setError] = createSignal("");

   const { authclient } = useConnect();

   type Credentials = {
      email: string,
      password: string
   };

   const register = async (cred: Credentials) => {
      setLoading(true);
      setError("");

      try {
         const request = new RegisterUserRequest({
            email: cred.email,
            password: cred.password,
         });
         const response = await authclient.registerUser(request);
         console.log("Register successful:", response);
      } catch (err) {
         console.error("Failed Register: ", err);
         if (err instanceof ConnectError) {
            setError(err.rawMessage);
         }
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

            <div class="w-full max-w-md rounded-lg shadow p-5">

               <h3 class="text-center">Create an account</h3>

               <p class='my-2 text-center'>Already have an account?
                  <a href='/login'> Login here</a>
               </p>

               <SpaceForm id="Form"
                  schema={validationSchema}

                  onSubmit={(state) => {
                     register(state as Credentials)
                  }}
               >
                  <Input name="email" icon={<IconEmail />} label='Email Address' type="text" placeholder="Email Address" />
                  <Input name="password" type="password" label='Password' placeholder="Password" />
                  <Input name="confirmpassword" type="password" label='Confirm password' placeholder="Confirm Password" />

                  <p class='py-1'>

                     <button class={CssUI.MaterialButton + " mt-1 mb-1 w-full justify-center"} disabled={loading()} type='submit'>
                        <p class='text-sm'>{loading() ? "Loading..." : "Continue"}</p>
                     </button>

                     {error() && <p style='AppErrorText'>{error()}</p>}
                  </p>
               </SpaceForm>

               <p class='mt-4 text-center'>
                  By creating an account you agree to the <a>Terms of Service</a> and our
                  <a> Privacy Policy</a>.
                  We'll occasionally send you emails about news, products, and services; you can opt-out anytime.
               </p>
            </div>
         </div>

      </GridLayout >
   );
}