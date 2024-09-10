import SpaceLayout from '../layouts/SpaceLayout.tsx';
import { EmailIcon } from '../components/svg.tsx';
import { GradientText, H3, P } from '../components/heading.tsx';
import { MaterialButton } from '../components/button.tsx';
import { SpaceForm } from '../components/spaceform.tsx';
import { TextInput } from '../components/textinput.tsx';

import { createSignal } from "solid-js";
import { RegisterUserRequest } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../components/connect.tsx';

import * as yup from 'yup';
import { ConnectError } from '@connectrpc/connect';

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
      <SpaceLayout two title='Login'>

         <div class="justify-center h-full items-center flex">

            <div class="w-full max-w-md bg-white dark:bg-gray-700 rounded-lg shadow p-5">

               <H3 class="text-center">Create an account</H3>

               <P class='my-2 text-center'>Already have an account?
                  <a href='/login'><GradientText> Login here</GradientText></a>
               </P>

               <SpaceForm id="Form"
                  schema={validationSchema}

                  onSubmit={(state) => {
                     register(state as Credentials)
                  }}
               >
                  <TextInput name="email" icon={EmailIcon()} label='Email Address' type="text" placeholder="Email Address"></TextInput>
                  <TextInput name="password" type="password" label='Password' placeholder="Password" />
                  <TextInput name="confirmpassword" type="password" label='Confirm password' placeholder="Confirm Password" />

                  <P class='py-1'>

                     <MaterialButton disabled={loading()} class='mt-1 mb-1 w-full justify-center' type='submit'>
                        <p class='text-sm'>{loading() ? "Loading..." : "Continue"}</p>
                     </MaterialButton>

                     {error() && <p style='AppErrorText'>{error()}</p>}
                  </P>
               </SpaceForm>

               <P class='mt-4 text-center'>
                  By creating an account you agree to the <a><GradientText>Terms of Service</GradientText></a> and our
                  <a><GradientText> Privacy Policy</GradientText></a>.
                  We'll occasionally send you emails about news, products, and services; you can opt-out anytime.
               </P>
            </div>
         </div>

      </SpaceLayout >
   );
}