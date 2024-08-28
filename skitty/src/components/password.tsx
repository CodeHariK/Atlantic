import { createSignal } from "solid-js";
import { useSpaceContext } from "./spaceform";
import { KeyIcon } from "./svg";

type PasswordProps = {
    name: string;
    type: string;
    placeholder: string;
    disabled?: boolean;
    readOnly?: boolean;
};

export function Password(props: PasswordProps) {
    const { state, handleChange } = useSpaceContext();
    const [showPassword, setShowPassword] = createSignal(false);

    return (
        <div class="relative">

            <input
                // id={id + props.name}
                // id="hs-floating-input-email-value"
                name={props.name}
                type={props.type == "password" ? (showPassword() ? "text" : "password") : props.type}
                disabled={props.disabled}
                readOnly={props.readOnly}
                placeholder={props.placeholder}
                value={state().values[props.name] || ''}
                onInput={(e) => {
                    handleChange(props.name, e.target.value)
                }}
                class={`ps-11 peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
                    focus:pt-6
                    focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6
                    [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6
                    autofill:pb-2
                    ${state().errors[props.name] ? "text-red-500 dark:text-red-500" : ""}`}

            />
            {state().errors[props.name] && <p class="ErrorText">{state().errors[props.name]}</p>}

            <label
                // for="hs-floating-input-email-value"
                class="ps-12 absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:scale-90
                    peer-focus:translate-x-0.5
                    peer-focus:-translate-y-1.5
                    peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
                    peer-[:not(:placeholder-shown)]:scale-90
                    peer-[:not(:placeholder-shown)]:translate-x-0.5
                    peer-[:not(:placeholder-shown)]:-translate-y-1.5
                    peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500">Email</label>

            <div
                class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
            >
                <KeyIcon />
            </div>

            {props.type === "password" && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword())}
                    class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                >
                    {showPassword() ? "Show" : "Hide"}
                </button>
            )}
        </div>
    );
}