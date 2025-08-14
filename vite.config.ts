import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), Inspect({ build: true, outputDir: './.vite-inspect' })],
	server: {
		allowedHosts: true,
		// watch: {
		// 	usePolling: true,
		// },
		warmup: {
			clientFiles: [
				'./src/routes/+page.svelte',
			]
		}
	}
});
