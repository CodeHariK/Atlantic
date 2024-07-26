<script lang="ts">
    import { onDestroy } from "svelte";
    import { getSpace, type FormStoreType } from "./formStore";

    const { store, handleChange } = getSpace<string>();

    export let name: string = "";
    export let title: string = "";
    export let options: { value: string; label: string }[] = [];
    export let selectedValue: string = ""; // Default selected value

    export let formCss: string = "flex flex-col";
    export let titleCss: string = "";

    let state: FormStoreType;

    const unsubscribe = store.subscribe((value) => {
        state = value;

        if (selectedValue != state.values[name]) {
            handleChange({
                target: { name, value: selectedValue },
            });
        }
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleRadioChange(event: Event) {
        const target = event.target as HTMLInputElement;
        selectedValue = target.value;
        handleChange({ target: { name, value: selectedValue } });
    }
</script>

<div class={formCss}>
    <h3 class={titleCss}>{title}</h3>

    {#each options as { value, label }}
        <label class="inline-flex items-center">
            <input
                type="radio"
                {name}
                {value}
                checked={value === selectedValue}
                on:change={handleRadioChange}
                class="form-radio text-blue-500"
            />
            <span class="ml-2">{label}</span>
        </label>
    {/each}
</div>
