import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";

type OptionType = {
    value: string;
    label: string;
};

type SelectProps = {
    id: string;
    options: Array<OptionType>;
    disabled?: boolean;
    header?: string;
};

export function Select(props: SelectProps) {
    const { state, handleChange } = useSpaceContext();

    return (
        <div class="mb-4">
            <label for={props.id} class="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white">
                {props.header}
            </label>
            <select
                id={props.id}
                name={props.id} // Use `props.id` as the name to match context handling
                value={state().values[props.id] || ""}
                disabled={props.disabled}
                class="AppSelect"
                onChange={(e) => handleChange(props.id, e.target.value)}
            >
                <Key each={props.options} by="value">
                    {(option) => (
                        <option value={option().value} >
                            {option().label}
                        </option>
                    )}
                </Key>
            </select>
        </div>
    );
}