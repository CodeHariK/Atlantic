import SpaceLayout from '../layouts/SpaceLayout.tsx';
import { EmailIcon } from '../components/svg.tsx';
import { GradientText, H3, P } from '../components/heading.tsx';
import { MaterialButton } from '../components/button.tsx';
import { SpaceForm } from '../components/spaceform.tsx';
import { TextInput } from '../components/textinput.tsx';

import { createSignal } from "solid-js";
import { EmailLoginRequest } from "../../api/auth/v1/auth_pb.ts";

import { useConnect } from '../components/connect.tsx';

import * as yup from 'yup';
import { CheckboxGroup } from '../components/checkbox.tsx';

export const validationSchema = yup.object().shape({
   email: yup.string().email('Invalid email').required('Email is required'),
   password: yup.string().min(3, 'Password must be at least 3 characters long').required('Password is required'),
   confirmpassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
});

export default function Register() {

   const [loading, setLoading] = createSignal(false);
   const [acceptTerms, setAcceptTerms] = createSignal(false);
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

               <H3 class="text-center">Create an account</H3>

               <SpaceForm id="Form"
                  schema={validationSchema}

                  onSubmit={(state) => {
                     register(state as Credentials)
                  }}
               >
                  <TextInput name="email" icon={EmailIcon()} label='Email Address' type="text" placeholder="Email Address"></TextInput>
                  <TextInput name="password" type="password" label='Password' placeholder="Password" />
                  <TextInput name="confirmpassword" type="password" label='Confirm password' placeholder="Confirm Password" />

                  <CheckboxGroup id="condition"
                     onChange={(s) => {
                        setAcceptTerms(s.has('accepted'))
                     }}
                     checkboxes={[
                        {
                           name: "accepted",
                           label: <P>I accept the <span class='text-blue-500 dark:text-blue-500'>Terms and Conditions</span></P>,
                        },
                     ]} />

                  <P class='py-1'>

                     <MaterialButton disabled={loading() || !acceptTerms()} class='mt-1 mb-1 w-full justify-center' type='submit'>
                        <p class='text-sm'>{loading() ? "Loading..." : "Continue"}</p>
                     </MaterialButton>

                     {error() && <p style='AppErrorText'>{error()}</p>}
                  </P>
               </SpaceForm>

               <P class='mt-4 text-center'>Already have an account?
                  <a href='/login'><GradientText> Login here</GradientText></a>
               </P>
            </div>
         </div>

      </SpaceLayout >
   );
}