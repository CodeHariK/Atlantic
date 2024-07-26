<script lang="ts">
    import * as Yup from "yup";
    import {
        setSpace,
        FormHandler,
        storePrint,
        type FormStoreType,
    } from "./formStore";

    export let schema: Yup.ObjectSchema<any>;
    export let onSubmit: (event: FormStoreType) => void;

    export let debug: boolean = false;
    export let formCss = "";
    export let formtitle = "";
    export let titleCss = "text-2xl font-semibold mb-4 text-gray-800";

    const formHandler = new FormHandler(schema);

    let store = formHandler.formStore;

    setSpace(formHandler);

    function handleSubmit(event: Event) {
        formHandler.handleSubmit(event);
        onSubmit($store);
    }
</script>

{#if debug}
    <pre
        class="border-dashed border-2 border-slate-300 rounded-2xl p-4 text-orange-400"
        id="debug">{storePrint($store)}</pre>
{/if}

<div class={formCss}>
    <h2 class={titleCss}>{formtitle}</h2>
    <form on:submit={handleSubmit}>
        <slot></slot>

        {#if $store.formErrors}
            <div class="text-red-400 text-sm mt-2">
                {$store.formErrors}
            </div>
        {/if}

        <button
            type="submit"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
            Submit
        </button>
    </form>
</div>
