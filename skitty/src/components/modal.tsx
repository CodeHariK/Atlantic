import { createSignal, Setter } from "solid-js";
import { BorderButton, RedButton } from "../components/button";
import { H6 } from "../components/heading";
import { CrossIcon, DeleteIcon } from "../components/svg";

import { type JSX } from 'solid-js';

export type ModalProps = {
    show: boolean;
    name?: JSX.Element;
    align?: { x: number, y: number };
    modal: (setShow: Setter<boolean>) => JSX.Element;
}

export function Modal(props: ModalProps) {

    let align = props.align ?? { x: 50, y: 50 }

    const [show, setShow] = createSignal(props.show);

    return (
        <div id="Modal" tabindex="-1" aria-hidden="true" class="fixed z-50 w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full">

            <div style={{ left: `${align?.x + "%"}`, top: `${align?.y + "%"}` }} class={`${show() ? "opacity-100 visible" : "opacity-0 invisible"} transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 relative h-full w-full max-w-md md:h-auto`}>

                {props.modal(setShow)}

            </div>
        </div>
    );
}

export function DeleteModal(setShow: Setter<boolean>) {
    return <div class="relative rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800 sm:p-5">
        <button onclick={() => { setShow(false); }} type="button" class="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteOrderModal">
            <CrossIcon></CrossIcon>
        </button>
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
            <DeleteIcon />
            <span class="sr-only">Danger icon</span>
        </div>
        <H6 class="mb-3">Are you sure you want to delete this order from your account?</H6>
        <div class="flex items-center justify-center space-x-4">
            <BorderButton>No, cancel</BorderButton>
            <RedButton>Yes, delete</RedButton>
        </div>
    </div>;
}
