import { createSignal, type JSX } from "solid-js";
import { useSpaceContext } from "./spaceform";
import { KeyIcon, LockIcon, UnlockIcon } from "./svg";

type TextInputProps = {
    name: string;
    type: "none" | "text" | "url" | "email" | "numeric" | "decimal" | "search" | "password" | "range" | "color" | "date" | "month" | "week" | "time" | "datetime-local";
    placeholder?: string;
    label?: string;
    header?: string;
    disabled?: boolean;
    readOnly?: boolean;
    pattern?: RegExp;
    icon?: JSX.Element;

    area?: boolean;
    min?: number;
    max?: number;
    step?: number;
};

export function TextInput(props: TextInputProps) {
    const { state, handleChange } = useSpaceContext();
    const [showPassword, setShowPassword] = createSignal(false);

    return (
        <>
            <p class="ml-1 mb-1 text-sm font-medium text-gray-700 dark:text-white">{props.header}</p>
            <div class="relative">

                {props.area ?

                    <textarea
                        // id={id + props.name}
                        // id="hs-floating-input-email-value"
                        name={props.name}
                        disabled={props.disabled}
                        readOnly={props.readOnly}
                        placeholder={props.placeholder || ''}
                        value={state().values[props.name] || ''}
                        onInput={(e) => {
                            if (!props.pattern || props.pattern.test(e.target.value)) {
                                handleChange(props.name, e.target.value)
                            } else {
                                handleChange(props.name, state().values[props.name])
                            }
                        }}
                        class={`${(props.icon || props.type === "password") ? 'ps-11' : ''} 
                        p-4 peer block w-full border-gray-200 rounded-lg text-sm
                        focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 
                        disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:focus:ring-neutral-600
                        ${props.label ? 'focus:placeholder:text-gray-400 focus:placeholder:dark:text-gray-400 placeholder:text-transparent placeholder:dark:text-transparent focus:pt-6 focus:pb-2 autofill:pt-6 autofill:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2' : ''}
                        ${state().errors[props.name] ? "AppTextInput AppErrorTextInput" : "AppTextInput"}`}

                    />

                    :

                    <input
                        // id={id + props.name}
                        // id="hs-floating-input-email-value"
                        name={props.name}
                        type={props.type == "password" ? (showPassword() ? "text" : "password") : props.type}
                        disabled={props.disabled}
                        readOnly={props.readOnly}
                        placeholder={props.placeholder || ''}
                        value={state().values[props.name] || ''}
                        onInput={(e) => {
                            if (!props.pattern || props.pattern.test(e.target.value)) {
                                handleChange(props.name, e.target.value)
                            } else {
                                handleChange(props.name, state().values[props.name])
                            }
                        }}

                        min={props.min} max={props.max} step={props.step} //range

                        class={`${(props.icon || props.type === "password") ? 'ps-11' : ''} 
                        p-4 peer block w-full border-gray-200 rounded-lg text-sm
                        focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 
                        disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700
                        dark:text-neutral-400 dark:focus:ring-neutral-600
                        ${(props.type === "range") ? 'cursor-pointer' : ''} 
                        ${props.label ? 'focus:placeholder:text-gray-400 focus:placeholder:dark:text-gray-400 placeholder:text-transparent placeholder:dark:text-transparent focus:pt-6 focus:pb-2 autofill:pt-6 autofill:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2' : ''}
                        ${state().errors[props.name] ? "AppTextInput AppErrorTextInput" : "AppTextInput"}`}
                    />
                }

                {props.label &&
                    <label
                        // for="hs-floating-input-email-value"
                        class={`
                            ${(props.icon || props.type === "password") ? 'ps-12 peer-focus:translate-x-2 peer-[:not(:placeholder-shown)]:translate-x-2' : 'peer-focus:translate-x-1 peer-[:not(:placeholder-shown)]:translate-x-1'} 
                            absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent 
                            origin-[0_0] text-gray-500 dark:text-gray-400 peer-disabled:opacity-50 peer-disabled:pointer-events-none
                            peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
                            peer-focus:scale-75 peer-[:not(:placeholder-shown)]:scale-75
                            peer-focus:-translate-y-1 peer-[:not(:placeholder-shown)]:-translate-y-1
                            peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-400`}
                    >{props.label}</label>
                }

                {(props.icon || props.type === "password") && (
                    <div
                        class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                    >
                        {props.icon ? props.icon : <KeyIcon />}
                    </div>
                )}

                {props.type === "password" && (
                    <button
                        type="button"
                        tabindex="-1"
                        onClick={() => setShowPassword(!showPassword())}
                        class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer trounded-e-md focus:outline-none"
                    >
                        {showPassword() ? <UnlockIcon /> : <LockIcon />}
                    </button>
                )}

            </div>
            {state().errors[props.name] && <p class="AppErrorText">{state().errors[props.name]}</p>}
        </>
    );
}