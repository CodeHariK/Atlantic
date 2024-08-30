import { Key } from "@solid-primitives/keyed";
import { useSpaceContext } from "./spaceform";

export type CheckboxType = {
    name: string;
    label: string;
    helperText?: string;
    disabled?: boolean;
}

type CheckboxGroupProps = {
    id: string;
    checkboxes: Array<CheckboxType>;
};

export function CheckboxGroup(props: CheckboxGroupProps) {
    const { id, state, handleChange } = useSpaceContext();

    return (
        <fieldset>
            <legend class="sr-only">Checkbox variants</legend>
            <Key each={props.checkboxes} by="name">
                {(option) => (
                    <div class="flex items-center mb-4">
                        <input
                            // id={id + item().name}
                            name={option().name}
                            type="checkbox"
                            checked={new Set(state().values[props.id]).has(option().name) || false}
                            disabled={option().disabled}
                            class="AppCheckboxInput"
                            onInput={(e) => {
                                let s = new Set(state().values[props.id])
                                if (s.has(option().name)) {
                                    s.delete(option().name)
                                } else {
                                    s.add(option().name)
                                }
                                handleChange(props.id, props.checkboxes.filter((c) => s.has(c.name)).map((c) => c.name))
                            }}
                        />
                        <label for={option().name} class={option().disabled ? "AppLabelDisabled" : "AppLabel"} >
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