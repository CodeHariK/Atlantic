<script lang="ts">
    import { onDestroy } from "svelte";
    import { getSpace, type FormStoreType } from "./formStore";
    import { InputType } from "./formStore";

    const { store, handleChange } = getSpace<string>();

    export let name: string = "";
    export let label: string = "";
    export let type: InputType = InputType.TEXT;
    export let value: any = "";

    export let formCss: string = "flex flex-col justify-center";
    export let titleCss: string = "";
    export let inputCss: string = "border border-gray-300 rounded p-2 w-full";

    let state: FormStoreType;

    const unsubscribe = store.subscribe((v) => {
        state = v;

        if (value != "" && state.values[name] != value) {
            handleChange({
                target: { name, value: value },
            });
        }
    });

    onDestroy(() => {
        unsubscribe();
    });

    let localtype: InputType = type;
    function togglePasswordVisibility(event: Event) {
        event.preventDefault();
        localtype =
            localtype == InputType.PASSWORD
                ? InputType.TEXT
                : InputType.PASSWORD;
    }

    // Handle change events for the input field
    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
        handleChange({ target: { name, value: value } });
    }
</script>

<div class={formCss}>
    <h3 class={titleCss}>{label}</h3>
    {#if type == InputType.TEXTAREA}
        <textarea
            {name}
            {value}
            on:input={handleInputChange}
            class={inputCss}
        />
    {:else}
        <input
            type={localtype}
            {name}
            {value}
            on:input={handleInputChange}
            class={inputCss}
        />

        {#if type === InputType.PASSWORD}
            <button
                on:click={togglePasswordVisibility}
                class={"absolute right-2 cursor-pointer"}
            >
                {#if localtype == InputType.PASSWORD}
                    show
                {:else}
                    hide
                {/if}
            </button>
        {/if}
    {/if}

    {#if state.errors[name]}
        <span class="text-sm text-red-500">{state.errors[name]}</span>
    {/if}
</div>
