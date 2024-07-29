import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";

export type RadioOptionType = {
    value: string;
    label: string;
    disabled?: boolean;
};

type RadioGroupProps = {
    name: string;
    options: Array<RadioOptionType>;
};

export function RadioGroup(props: RadioGroupProps) {
    const { state, handleChange } = useSpaceContext();

    return (
        <fieldset>
            <legend class="sr-only">Select an option</legend>

            <Key each={props.options} by="value">
                {(option) => (
                    <div class="flex items-center mb-4">
                        <input
                            id={`radio-${option().value}`}
                            type="radio"
                            name={props.name}
                            value={option().value}
                            checked={state().values[props.name] === option().value}
                            disabled={option().disabled}
                            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                            onChange={(e) => handleChange(props.name, e.target.value)}
                        />
                        <label for={`radio-${option().value}`} class={option().disabled ? "LabelDisabled" : "Label"}>
                            {option().label}
                        </label>
                    </div>
                )}
            </Key>
        </fieldset>
    );
}