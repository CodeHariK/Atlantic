<script lang="ts">
    import { onDestroy } from "svelte";
    import { getSpace, type FormStoreType } from "./formStore";
    import { setsAreEqual } from "./formStore";

    const { store, handleChange } = getSpace<Set<string>>();

    export let name: string = "";
    export let title: string = "";
    export let options: Array<{ value: string; label: string }> = [];
    export let selectedValues: Set<string> = new Set(); // Default selected values

    export let formCss: string = "flex flex-col";
    export let titleCss: string = "";

    let state: FormStoreType;

    const unsubscribe = store.subscribe((value) => {
        state = value;

        if (!setsAreEqual(state.values[name], selectedValues)) {
            handleChange({
                target: { name, value: selectedValues },
            });
        } else {
            selectedValues = state.values[name];
        }
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleCheckboxChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const { value, checked } = target;

        if (checked) {
            selectedValues.add(value);
        } else {
            selectedValues.delete(value);
        }

        handleChange({
            target: { name, value: new Set(selectedValues) },
        });
    }
</script>

<div class={formCss}>
    <h3 class={titleCss}>{title}</h3>

    {#each options as { value, label }}
        <label class="inline-flex items-center">
            <input
                type="checkbox"
                {name}
                {value}
                checked={selectedValues.has(value)}
                on:change={handleCheckboxChange}
                class="form-checkbox h-6 w-6 text-blue-600 border-gray-400 rounded-lg checked:bg-blue-600 checked:border-transparent focus:ring-blue-500"
            />
            <span class="ml-2">{label}</span>
        </label>
    {/each}
</div>
