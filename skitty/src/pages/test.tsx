import { CartModal } from '../components/header';
import { DeleteModal, Modal } from '../components/modal';
import { Pattern } from '../data/regex';
import { TelTest } from '../data/regex_test';
import SpaceLayout from '../layouts/SpaceLayout';
import { AccountModal } from './account';
import { OrderDetails } from './orderdetails';

import { CheckboxGroup } from "../components/checkbox";
import { RadioGroup } from "../components/radio";
import { SearchInput } from "../components/search";
import { Select } from "../components/select";
import { TextInput } from "../components/textinput";
import { SpaceForm, SpaceDebugInfo, SpaceFormError } from "../components/spaceform";
import * as yup from 'yup';


export default function Test() {
   return (
      <SpaceLayout two title='Page Not Found'>
         {/* <TelTest pattern={Pattern.Tel}></TelTest> */}

         <CartModal />
         {/* <Modal show modal={(setter) => DeleteModal(setter)} /> */}

         {/* <AccountModal /> */}
         <ClassicForm />

      </SpaceLayout>
   );
}

export const validationSchema = yup.object().shape({
   first_name: yup.string().required('First name is required'),
   // company: yup.string().required('Company is required'),
   phone: yup.string().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{3}$/, 'Phone number must be in the format 123-45-678').required('Phone number is required'),
   // website: yup.string().url('Must be a valid URL').required('Website URL is required'),
   // visitors: yup.number().positive('Must be a positive number').required('Unique visitors are required'),
   // email: yup.string().email('Invalid email address').required('Email address is required'),
   // password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
   // confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
   // remember: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});

export function ClassicForm() {

   const checkboxes = [
      {
         name: "checkbox-1",
         label: "I agree to the terms and conditions",
         helperText: "Terms and conditions apply.",
         disabled: false
      },
      {
         name: "checkbox-2",
         label: "I want to get promotional offers",
         helperText: "Get offers and updates.",
         disabled: false
      },
      {
         name: "checkbox-3",
         label: "I am 18 years or older",
         disabled: true
      }
   ];

   const selectOptions = [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "fr", label: "France" },
      { value: "de", label: "Germany" }
   ];

   return <>
      <SpaceForm
         id="Form"
         initialFormState={{
            values: {
               "first_name": "Hello",
               "hello": ["checkbox-3"],
               "country": "fr",
               "countries": "USA"
            },
            status: {},
            errors: {},
            formerror: ""
         }}
         schema={validationSchema}

         onSubmit={(state) => {
            console.log(state)
         }}
      >
         <SpaceDebugInfo />

         <SearchInput name="search" placeholder="placeholder" />

         <CheckboxGroup id={"hello"} checkboxes={checkboxes} />

         <Select id="country" options={selectOptions} />

         <RadioGroup
            name="countries"
            vertical
            options={[
               { value: "USA", label: "United States" },
               { value: "Germany", label: "Germany" },
               { value: "Spain", label: "Spain" },
               { value: "United Kingdom", label: "United Kingdom" },
               { value: "China", label: "China (disabled)", disabled: true }
            ]}
         />

         <TextInput name="password" type="password" placeholder="placeholder" />
         <TextInput name="value" type="range" header='value' placeholder="value" />

         <SpaceFormError />

         <button type="submit">Submit</button>
         <button type="reset">Reset</button>
      </SpaceForm>
   </>
}
