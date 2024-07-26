<script lang="ts">
    import * as yup from "yup";
    import SpaceForm from "./SpaceForm.svelte";
    import CheckBoxGroup from "./CheckBoxGroup.svelte";
    import InputField from "./InputField.svelte";
    import RadioGroup from "./RadioGroup.svelte";
    import RangeInput from "./RangeInput.svelte";
    import { InputType, type FormStoreType } from "./formStore";

    const validationSchema = yup.object({
        name: yup
            .string()
            .required("Name is required.")
            .min(3, "Name must be at least 3 characters long."),
        password: yup
            .string()
            .required("Name is required.")
            .min(3, "Name must be at least 3 characters long."),
        email: yup
            .string()
            .required("Email is required.")
            .email("Please enter a valid email address."),
        age: yup
            .number()
            .required("Age is required.")
            .min(1, "Age must be at least 1."),
    });

    function handleSubmit(event: FormStoreType) {
        console.log("Form submitted ->", event);
    }
</script>

<SpaceForm
    debug={true}
    schema={validationSchema}
    onSubmit={handleSubmit}
    formtitle="Hello"
    formCss="p-6 rounded-lg shadow-md"
>
    <InputField label="Name" type={InputType.TEXT} name="name" />
    <InputField label="Email" type={InputType.EMAIL} name="email" />
    <InputField label="PASSWORD" type={InputType.PASSWORD} name="password" />
    <InputField
        label="Monitor"
        type={InputType.DATE}
        name="gpu"
        value="2024-07-13"
    />
    <InputField label="Cpu" type={InputType.TEXTAREA} name="cpu" />

    <InputField label="Age" type={InputType.NUMBER} name="age" value="3" />

    <CheckBoxGroup
        name="preferences"
        title="Select your preferences"
        options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
        ]}
        selectedValues={new Set(["option1"])}
        formCss="flex flex-col space-y-2"
        titleCss="text-xl font-bold"
    />

    <RadioGroup
        name="hello"
        title="Hello"
        options={[
            { value: "hello", label: "Hello" },
            { value: "hi", label: "Hi" },
            { value: "sol", label: "Sol" },
        ]}
        selectedValue={"hi"}
    />

    <RangeInput label="Bio" name="bio" value={2} />
</SpaceForm>
