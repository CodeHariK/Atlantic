import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";
import { JSX } from "solid-js";

export type CheckboxType = {
    name: string;
    label: JSX.Element;
    helperText?: string;
    disabled?: boolean;
}

type CheckboxGroupProps = {
    id: string;
    checkboxes: Array<CheckboxType>;
    onChange?: (s: Set<string>) => void;
};

export function CheckboxGroup(props: CheckboxGroupProps) {
    const { state, handleChange } = useSpaceContext();

    return (
        <fieldset>
            <legend class="sr-only">Checkbox variants</legend>
            <Key each={props.checkboxes} by="name">
                {(option) => (

                    <div class="flex items-center">
                        <input
                            id={option().name}
                            name={option().name}
                            type="checkbox"
                            checked={new Set(state().values[props.id]).has(option().name) || false}
                            disabled={option().disabled}
                            class="AppCheckboxInput"
                            onInput={() => {
                                let s = new Set<string>(state().values[props.id])
                                if (s.has(option().name)) {
                                    s.delete(option().name)
                                } else {
                                    s.add(option().name)
                                }
                                props.onChange?.(s)
                                handleChange(props.id, props.checkboxes.filter((c) => s.has(c.name)).map((c) => c.name))
                            }}
                        />
                        <label for={option().name} class={`${option().disabled ? "AppLabelDisabled" : "AppLabel"} p-1`} >
                            {option().label}
                            {option().helperText && (
                                <p id={`${option().name}-text`} class="AppHelperLabel">
                                    {option().helperText}
                                </p>
                            )}
                        </label>
                    </div>
                )}
            </Key>
        </fieldset>
    );
}