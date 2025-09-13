import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',     // folder for HTML output
      assets: 'build',
      fallback: 'index.html', // so SPA routing works
    })
  }
};

export default config;
