<script>
    import { onMount } from "svelte";

    let theme = "light";

    onMount(() => {
        theme = localStorage.getItem("theme");
    });

    function toggleTheme() {
        theme = theme === "light" ? "dark" : "light";
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }
</script>

<button on:click={toggleTheme} class="p-2">
    {theme === "light" ? "🌞" : "🌜"}
</button>
