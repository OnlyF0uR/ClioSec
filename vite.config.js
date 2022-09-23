import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	server: {
		fs: {
		  // Allow serving files from one level up to the project root
		  allow: ['lib'],
		},
	  },
};

export default config;