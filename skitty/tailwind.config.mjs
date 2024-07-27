/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        './node_modules/flowbite-svelte/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
        'node_modules/preline/dist/*.js',
    ],
    plugins: [
        require('flowbite/plugin'),
        require('preline/plugin')
    ],

    darkMode: 'class'
}
