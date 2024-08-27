
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import solid from '@astrojs/solid-js';

import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
    site: 'https://atlantic.shark.run',
    server: { port: 8080 },
    integrations: [
        solid(),

        tailwind({ applyBaseStyles: false, }),

        sitemap(),
        robotsTxt(),
    ],

    devToolbar: {
        enabled: false
    }
});
