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

export function BaseButton(props: ButtonProps) {
    return <button onClick={props.onClick} class={`${props.class}`} type={props.type} disabled={props.disabled}>
        {props.children}
    </button>;
}

export function BorderButton(props: ButtonProps) {
    return <BaseButton onClick={props.onClick} class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">{props.children}</BaseButton>;
}

export function RedButton(props: ButtonProps) {
    return <BaseButton onClick={props.onClick} class="rounded-lg bg-red-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700">{props.children}</BaseButton>;
}

