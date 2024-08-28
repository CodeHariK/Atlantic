import { useSpaceContext } from "./spaceform";

type TextInputProps = {
    name: string;
    type: "none" | "text" | "url" | "email" | "numeric" | "decimal" | "search" | "password" | "range" | "color" | "date" | "month" | "week" | "time" | "datetime-local";
    placeholder: string;
    pattern?: RegExp;
};

export function TextInput(props: TextInputProps) {
    const context = useSpaceContext();

    const { id, state, handleChange } = context;

    return (
        <div>
            <input
                // id={id + props.name}
                name={props.name}
                type={props.type}
                class={state().errors[props.name] ? "ErrorTextInput" : "TextInput"}
                placeholder={props.placeholder}
                value={state().values[props.name] || ''}
                onInput={(e) => {
                    if (!props.pattern || props.pattern.test(e.target.value)) {
                        handleChange(props.name, e.target.value)
                    } else {
                        handleChange(props.name, state().values[props.name])
                    }
                }}
            />
            {state().errors[props.name] && <p class="ErrorText">{state().errors[props.name]}</p>}
        </div>
    );
}