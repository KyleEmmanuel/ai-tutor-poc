import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			'sans': ['Helvetica', 'Arial', 'sans-serif'],
		},
		extend: {}
	},

	plugins: [typography, forms, containerQueries, aspectRatio, require('daisyui'),]
};
