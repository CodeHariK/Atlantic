import { type JSX } from 'solid-js';

export type ButtonProps = {
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    children?: JSX.Element;
    disabled?: boolean,
    onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined,
}

export function IconButton(props: ButtonProps) {
    return <button onClick={props.onClick} class={`AppIconButton ${props.class}`} type={props.type} disabled={props.disabled}>
        {props.children}
    </button>;
}

export function MaterialButton(props: ButtonProps) {
    return <button onClick={props.onClick} class={`AppButton ${props.class}`} type={props.type} disabled={props.disabled}>
        {props.children}
    </button>;
}

export function OutlinedButton(props: ButtonProps) {
    return <button onClick={props.onClick} class={`AppOutlinedButton ${props.class}`} type={props.type} disabled={props.disabled}>
        {props.children}
    </button>;
}

