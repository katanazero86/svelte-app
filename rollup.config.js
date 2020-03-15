import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

import postcss from 'rollup-plugin-postcss'; // rollup postcss plugin
import postcssimport from 'postcss-import'; // postcss-import plugin : @import 구문을 사용할 수 있게해줌
import autoprefixer from 'autoprefixer'; // autoprefixer plugin : css 접두사를 붙여줌
import tailwindcss from 'tailwindcss'; // tailwindcss plugin
import purgecss from '@fullhuman/postcss-purgecss'; // postcss-purgecss plugin : PurgeCSS는 사용하지 않는 CSS를 제거하는 도구

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [

		postcss({
			plugins: [
				postcssimport(),
				tailwindcss(),
				autoprefixer(),
				purgecss({
					content: ["**/*.html", "**/*.svelte"],
					defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
					// fontFace: true,
					// keyframes: true,
				}),
			],
			// extract: true, // js 파일이 생성된 동일한 위치에 css 파일을 추출
		}),

		svelte({

			// preprocess: sveltePreprocess({ postcss: true }),

			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('public/build/bundle.css');
			},

			emitCss: true
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		json({
			compact: true
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}
