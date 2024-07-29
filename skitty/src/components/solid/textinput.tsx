import { useSpaceContext } from "./spaceform";

type TextInputProps = {
    name: string;
    type: string;
    placeholder: string;
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
                    handleChange(props.name, e.target.value)
                }}
            />
            {state().errors[props.name] && <p class="ErrorText">{state().errors[props.name]}</p>}
        </div>
    );
}