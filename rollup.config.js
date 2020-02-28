import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import html from 'rollup-plugin-bundle-html';

const production = !process.env.ROLLUP_WATCH;

// Add helpers to create 'js' and 'css' for svelte
const dest = process.env.WEBPACK_OUT_DIR || 'public/asset';
function outPath(fn) {
  const filename = production ? fn : fn.replace(/\[hash\]/, 'development');
  return [dest, filename].join('/');
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: outPath('app.[hash].js')
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file  better for performance
			css: css => {
				css.write(outPath('app.[hash].css'));
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration 
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),

		// M::P::Webpack needs this file to know how to include assets
    html({
      dest,
      filename: 'webpack.' + (production ? 'production' : 'development') + '.html',
      inject: 'head',
      template: '<html><head></head><body></body></html>',
    }),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
