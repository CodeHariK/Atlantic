import { writable, type Writable } from 'svelte/store';
import * as Yup from 'yup';
import { getContext, setContext } from "svelte";

export type FormStoreType = {
    values: { [key: string]: any };
    errors: { [key: string]: string };
    formErrors: string;
};

export function storePrint(store: FormStoreType): string {
    const storeCopy = {
        values: Object.fromEntries(
            Object.entries(store.values).map(([key, value]) => [
                key,
                value instanceof Set
                    ? [...value]
                    : value,
            ]),
        ),
        errors: store.errors,
        formErrors: store.formErrors,
    };

    return JSON.stringify(storeCopy, null, 2);
}

export function setSpace(formHandler: FormHandler) {
    setContext("formContext", {
        store: formHandler.formStore,
        handleChange: formHandler.handleChange.bind(formHandler),
    });
}
export function getSpace<T>() {
    return getContext<{
        store: Writable<FormStoreType>;
        handleChange: (event: {
            target: { name: string; value: T };
        }) => void;
    }>("formContext");
}


export class FormHandler {
    private schema: Yup.ObjectSchema<any>;
    public formStore: Writable<FormStoreType>;

    constructor(schema: Yup.ObjectSchema<any>) {
        const formStore = writable<FormStoreType>({
            values: {},
            errors: {},
            formErrors: ""
        });
        this.schema = schema;
        this.formStore = formStore
    }

    private getState() {
        let state: FormStoreType;
        this.formStore.subscribe((value) => {
            state = value;
        })();
        return state;
    }

    private async validateField(field: string, value: string) {
        try {
            await this.schema.validateAt(field, { [field]: value });
            this.formStore.update((state) => ({
                ...state,
                errors: { ...state.errors, [field]: undefined },
                formErrors: ""
            }));
        } catch (err) {
            if (err.path === field) {
                this.formStore.update((state) => ({
                    ...state,
                    errors: { ...state.errors, [field]: err.message }
                }));
            }
        }
    }

    private async validateAllFields() {
        const state = this.getState();
        const fieldNames = Object.keys(this.schema.fields);
        await Promise.all(fieldNames.map(field => this.validateField(field, state.values[field])));
    }

    public handleChange(event: { target: { name: string; value: string } }) {
        const { name, value } = event.target;
        this.formStore.update((state) => {
            this.validateField(name, value);
            return {
                ...state,
                values: { ...state.values, [name]: value }
            };
        });
    }

    public async handleSubmit(event: Event) {
        event.preventDefault();
        this.formStore.update((state) => ({
            ...state,
            formErrors: "",
            errors: {}
        }));

        await this.validateAllFields();

        const state = this.getState();
        const hasErrors = Object.values(state.errors).some(error => error);

        if (!hasErrors) {
            console.log("****@Console****")
            // try {
            //     await this.schema.validate(state.values, { abortEarly: false });
            // } catch (err) {
            //     if (err.inner) {
            //         this.formStore.update((state) => ({
            //             ...state,
            //             formErrors: err.inner
            //                 .map((error) => `${error.path}: ${error.message}`)
            //                 .join("\n")
            //         }));
            //     }
            // }
        } else {
            this.formStore.update((state) => ({
                ...state,
                formErrors: "Please correct the highlighted errors."
            }));
        }
    }
}

export function setsAreEqual(setA: Set<string>, setB: Set<string>): boolean {
    let a = setA ?? new Set();
    let b = setB ?? new Set();
    if (a.size !== b.size) return false;
    for (let item of a) {
        if (!b.has(item)) return false;
    }
    return true;
}

export enum InputType {
    TEXT = "text",
    NUMBER = "number",
    TEXTAREA = "textarea",
    EMAIL = "email",
    PASSWORD = "password",
    TEL = "tel",
    URL = "url",
    DATE = "date",
    TIME = "time",
    DATETIME_LOCAL = "datetime-local",
    WEEK = "week",
    MONTH = "month",
}