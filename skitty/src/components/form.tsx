import { CheckboxGroup } from "./checkbox";
import { RadioGroup } from "./radio";
import { SearchInput } from "./search";
import { Select } from "./select";
import { Password } from "./password";
import { SpaceForm, SpaceDebugInfo, SpaceFormError } from "./spaceform";
import { TextInput } from "./textinput";
import * as yup from 'yup';
import { Pattern } from "../data/regex";

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

            <TextInput name="first_name" type="password" placeholder="placeholder"></TextInput>

            <TextInput name="phone" pattern={Pattern.Tel} type="text" placeholder="phone"></TextInput>

            <SearchInput name="search" placeholder="placeholder" />

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

            <Password name="password" type="password" placeholder="placeholder" />

            <SpaceFormError />

            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </SpaceForm>
    </>
}
