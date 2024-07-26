<script lang="ts">
    import { onDestroy } from "svelte";
    import { getSpace, type FormStoreType } from "./formStore";

    const { store, handleChange } = getSpace<number>();

    export let name: string = "";
    export let label: string = "";
    export let min: number = 0; // Minimum value for the range
    export let max: number = 100; // Maximum value for the range
    export let step: number = 1; // Step value for the range
    export let value: number = min; // Initial value of the range, default to min

    export let formCss: string = "flex flex-col";
    export let titleCss: string =
        "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

    let state: FormStoreType;

    const unsubscribe = store.subscribe((v) => {
        state = v;

        if (state.values[name] != value) {
            handleChange({
                target: { name, value: value },
            });
        }
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleRangeChange(event: Event) {
        const target = event.target as HTMLInputElement;
        value = Number(target.value);
        handleChange({ target: { name, value: value } });
    }
</script>

<div class={formCss}>
    <label for={name} class={titleCss}>{label}</label>

    <input
        type="range"
        {name}
        {min}
        {max}
        {step}
        {value}
        on:input={handleRangeChange}
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    />
    <div class="flex justify-between text-sm mt-2">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
    </div>
</div>
