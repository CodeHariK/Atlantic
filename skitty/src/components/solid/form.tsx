import { CheckboxGroup } from "./checkbox";
import { RadioGroup } from "./radio";
import { Select } from "./select";
import { SpaceForm, SpaceDebugInfo, SpaceFormError } from "./spaceform";
import { TextInput } from "./textinput";
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    company: yup.string().required('Company is required'),
    phone: yup.string().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{3}$/, 'Phone number must be in the format 123-45-678').required('Phone number is required'),
    website: yup.string().url('Must be a valid URL').required('Website URL is required'),
    visitors: yup.number().positive('Must be a positive number').required('Unique visitors are required'),
    email: yup.string().email('Invalid email address').required('Email address is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    remember: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
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

            <TextInput name="first_name" type="password" placeholder="placeholder"></TextInput>

            <form>
                <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                    <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

            <CheckboxGroup id={"hello"} checkboxes={checkboxes} />

            <Select id="country" options={selectOptions} />

            <RadioGroup
                name="countries"
                options={[
                    { value: "USA", label: "United States" },
                    { value: "Germany", label: "Germany" },
                    { value: "Spain", label: "Spain" },
                    { value: "United Kingdom", label: "United Kingdom" },
                    { value: "China", label: "China (disabled)", disabled: true }
                ]}
            />

            <SpaceFormError />
        </SpaceForm>
    </>
}
