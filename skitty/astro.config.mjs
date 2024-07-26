import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

export default defineConfig({
    server: { port: 8080 },
    integrations: [
        svelte(),
        tailwind(),
    ],
});