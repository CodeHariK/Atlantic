import { createSignal, Setter } from "solid-js";
import { BorderButton, RedButton } from "../components/button";
import { H6 } from "../components/heading";
import { CrossIcon, DeleteIcon } from "../components/svg";

import { type JSX } from 'solid-js';

export type ModalProps = {
    show?: boolean;
    child: JSX.Element;
    align?: { x: number, y: number };
    size?: { x: number };
    modal: (setShow: Setter<boolean>) => JSX.Element;
}

export function Modal(props: ModalProps) {

    let align = props.align ?? { x: 50, y: 50 }
    let size = props.size ?? { x: 28 }

    const [show, setShow] = createSignal(props.show || false);

    return (
        <>
            <button onClick={() => { setShow(true) }}>
                {props.child}
            </button>
            {
                !show()
                    ?
                    <></>
                    :
                    <div id="Modal" onClick={() => { setShow(false) }} class="fixed z-50 w-full items-center justify-center overflow-y-auto overflow-x-hidden inset-0">
                        <div onClick={(event) => { event.stopPropagation() }} style={{ left: `${align?.x + "%"}`, top: `${align?.y + "%"}`, "max-width": `${size?.x + "%"}` }}
                            class={`${show() ? "opacity-100 visible" : "opacity-0 invisible"} pointer-events-auto bg-gray-50 dark:bg-gray-800 rounded-lg transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2 relative w-full h-auto shadow-2xl`}>

                            <button onclick={() => { if (setShow) setShow(false); }} type="button" class="absolute z-50 right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteOrderModal">
                                <CrossIcon></CrossIcon>
                            </button>

                            <div class="rounded-lg p-4 pt-10 text-center">
                                {props.modal(setShow)}
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export function DeleteModal(setShow?: Setter<boolean>) {
    return <div class=" rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800 sm:p-5">
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
            <DeleteIcon />
            <span class="sr-only">Danger icon</span>
        </div>
        <H6 class="mb-3">Are you sure you want to delete this order from your account?</H6>
        <div class="flex items-center justify-center space-x-4">
            <BorderButton>No, cancel</BorderButton>
            <RedButton onClick={() => { if (setShow) setShow(false) }}>Yes, delete</RedButton>
        </div>
    </div>;
}
