import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const killServer = () => ({
	name: 'killServerSigTerm',
	killServerOnSigTerm(server) {
		console.log('killServerOnSigTerm');
		if (!server.httpServer) return;
		process.on('SIGTERM', () => {
			server.httpServer.close(() => {
				process.exit(0);
			});
		});
	}
});

export default defineConfig({
	plugins: [sveltekit(), purgeCss(), killServer()]
});
