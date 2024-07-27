
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';
import purgecss from 'astro-purgecss';

export default defineConfig({
    server: { port: 8080 },
    integrations: [
        svelte(),
        tailwind(),
        purgecss()
    ],
});
